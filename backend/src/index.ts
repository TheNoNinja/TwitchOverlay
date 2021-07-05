import express, {Request, Response} from "express";
import expressWS from "express-ws";
import * as ws from "ws";
import {ApiClient, HelixFollow, HelixUser, StaticAuthProvider} from "twitch";
import {Callbacks} from "./types/Callbacks";
import {ENV} from "./types/ENV";
import {getBadges} from "./Badges";
import {initHooks} from "./Hooks";
import {initPubSub} from "./PubSub";
import {initChat} from "./Chat";
import * as dotenv from 'dotenv';
const cors = require('cors');

let env: ENV;

let badges: Record<string, string> = {};

function initCallbacks(): Callbacks {
    return {} as any;
}

function initEnv(): ENV {
    dotenv.config();

    const clientId: string | undefined = process.env.CLIENT_ID;
    const accessToken: string | undefined = process.env.ACCESS_TOKEN;
    const refreshToken: string | undefined = process.env.REFRESH_TOKEN;
    const channelName: string | undefined = process.env.CHANNEL_NAME;
    const localWebHookPort: string | undefined = process.env.LOCAL_WEB_HOOK_PORT;
    const twitchWebHookPort: string | undefined = process.env.TWITCH_WEB_HOOK_PORT;

    if (clientId === undefined) throw new Error("CLIENT_ID missing from .env");
    if (accessToken === undefined) throw new Error("ACCESS_TOKEN missing from .env");
    if (refreshToken === undefined) throw new Error("REFRESH_TOKEN missing from .env");
    if (channelName === undefined) throw new Error("CHANNEL_NAME missing from .env");
    if (localWebHookPort === undefined) throw new Error("WEB_HOOK_PORT missing from .env");
    if (twitchWebHookPort === undefined) throw new Error("WEB_HOOK_PORT missing from .env");

    const localPort = parseInt(localWebHookPort);
    const twitchPort = parseInt(twitchWebHookPort);

    return {
        clientId,
        accessToken,
        refreshToken,
        channelName,
        localWebHookPort: localPort,
        twitchWebHookPort: twitchPort
    }
}

async function init(): Promise<Callbacks>{
    env = initEnv();

    console.log("Authenticating...");
    const authProvider = new StaticAuthProvider(env.clientId, env.accessToken, [
        "user_read",
        "user_blocks_edit",
        "user_blocks_read",
        "user_follows_edit",
        "channel_read",
        "channel_editor",
        "channel_commercial",
        "channel_stream",
        "channel_subscriptions",
        "user_subscriptions",
        "channel_check_subscription",
        "chat_login",
        "channel_feed_read",
        "channel_feed_edit",
        "collections_edit",
        "communities_edit",
        "communities_moderate",
        "viewing_activity_read",
        "openid",
        "analytics:read:extensions",
        "user:edit",
        "user:read:email",
        "clips:edit",
        "bits:read",
        "analytics:read:games",
        "user:edit:broadcast",
        "user:read:broadcast",
        "chat:read",
        "chat:edit",
        "channel:moderate",
        "channel:read:subscriptions",
        "whispers:read",
        "whispers:edit",
        "moderation:read",
        "channel:read:redemptions",
        "channel:edit:commercial"
    ]);

    console.log("Authentication success full!");

    const apiClient = new ApiClient({authProvider});
    const user: HelixUser | null = await apiClient.helix.users.getUserByName(env.channelName);

    if (user === null){
        throw new Error(`Failed getting user '${env.channelName}'!`);
    }

    let callbacks = initCallbacks();

    console.log("Initializing hooks...");
    callbacks = await initHooks(callbacks, apiClient, user, env);
    console.log("Initialized Hooks!");

    console.log("Initializing publish subscribe system...");
    callbacks = await initPubSub(callbacks, apiClient, user, env);
    console.log("Initialized publish subscribe system!");

    console.log("Initializing chat...");
    callbacks = await initChat(callbacks, apiClient, env);
    console.log("Initialized chat!");

    console.log("Loading badges...");
    badges = await getBadges(apiClient, user);
    console.log("Loaded badges!");

    return callbacks;
}

async function main (){
    const callbacks: Callbacks = await init();
    callbacks.onFollow = onFollow;
    callbacks.onSubscribe = (payload) => send("SUBSCRIBE", payload);
    callbacks.onBits = (payload) => send("BITS", payload);
    callbacks.onChat = (payload) => send("CHAT", payload);
    callbacks.onHost = (payload) => send("HOST", payload);
    callbacks.onRaid = (payload) => send("RAID", payload);
    callbacks.onParty = () => send("PARTY", {});
    callbacks.onBadges = (payload) => send("BADGES", payload);

    const _app = express();
    _app.use(cors());
    const {app} = expressWS(_app);

    let sockets: ws[] = [];

    app.ws("/events", (ws: ws, req: Request) => {
        sockets.push(ws);
        callbacks.onBadges(badges);
        ws.onclose = () => sockets.filter(it => it !== ws);
    })

    app.listen(env.localWebHookPort, () => {
       console.log(`Server started on http://localhost:${env.localWebHookPort}/`);
    });

    _app.get("/debug/follow", (req: Request, res: Response) =>{
       callbacks.debugFollow();
       res.status(200);
       res.send("Debug follow send");
    });

    _app.get("/debug/subscribe", (req: Request, res: Response) =>{
        callbacks.debugSubscribe();
        res.status(200);
        res.send("Debug subscribe send");
    });

    _app.get("/debug/resubscribe", (req: Request, res: Response) =>{
        callbacks.debugReSubscribe();
        res.status(200);
        res.send("Debug resubscribe send");
    });

    _app.get("/debug/giftSubscribe", (req: Request, res: Response) =>{
        callbacks.debugGiftSubscribe();
        res.status(200);
        res.send("Debug gift subscribe send");
    });

    _app.get("/debug/anonGiftSubscribe", (req: Request, res: Response) =>{
        callbacks.debugAnonGiftSubscribe();
        res.status(200);
        res.send("Debug anonymous gift subscribe send");
    });

    function send(type: string, payload: any){
        sockets = sockets.filter(socket => socket.readyState === 1);
        sockets.forEach(socket => {
            socket.send(JSON.stringify({type, payload}));
        })
    }

    function onFollow(follow: HelixFollow){
        send("FOLLOW", {
            userDisplayName: follow.userDisplayName,
            userId: follow.userId,
            followedUserId: follow.followedUserId,
            followedUsername: follow.followedUserName,
            followedUserDisplayName: follow.followedUserDisplayName,
        })
    }
}

main();