import {ApiClient, HelixFollow, HelixUser} from "twitch";
import {WebHookListener, SimpleAdapter, Subscription} from "twitch-webhooks";
import {Callbacks} from "./types/Callbacks";
import {ENV} from "./types/ENV";
import {randomName} from "./Utils/Random";

export async function initHooks(callbacks: Callbacks, apiClient:ApiClient, user:HelixUser, env:ENV): Promise<Callbacks> {

    const listener = new WebHookListener(apiClient, new SimpleAdapter({hostName: "localhost", listenerPort: env.twitchWebHookPort}));
    await listener.listen();

    let subscription : Subscription = await startHooks(listener, user, callbacks);

    setInterval(async () => {
        console.log("Weekly restart of subscription...");
        await subscription.stop();
        subscription = await startHooks(listener, user, callbacks);
        console.log("Subscription restarted!");
    }, 7 * 24 * 3600 * 1000);

    callbacks.debugFollow = () => {
        console.log("Debug Follow");
        callbacks.onFollow(new HelixFollow({
            from_login: randomName(),
            to_login: randomName(),
            followed_at: new Date().toLocaleDateString(),
            from_id: randomName(),
            from_name: randomName(),
            to_id: randomName(),
            to_name: randomName()
        }, apiClient));
    }

    return callbacks;
}

async function startHooks(listener: WebHookListener, user: HelixUser, callbacks:Callbacks): Promise<Subscription> {
    return await listener.subscribeToFollowsToUser(user, (follow: HelixFollow)=>{
        console.log(`Follow from ${follow.followedUserDisplayName}!`);
        callbacks.onFollow(follow);
    });
}