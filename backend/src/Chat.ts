import {ChatClient, ParsedMessageEmotePart} from "twitch-chat-client";
import {Callbacks} from "./types/Callbacks";
import {ChatBadge} from "./types/ChatBadge";
import {ChatEvent} from "./types/ChatEvent";
import {ENV} from "./types/ENV";
import {Emote} from "./types/Emote";
import {ApiClient} from "twitch";

export async function initChat(callbacks: Callbacks, apiClient: ApiClient, {channelName}: ENV): Promise<Callbacks> {
    const chatClient = new ChatClient(apiClient, {channels: [channelName]});

    chatClient.onMessage((channel, user, message, msg) =>{
        console.log("Got chat message");
        const emotes: ParsedMessageEmotePart[] = msg.parseEmotes().filter(emote => emote.type === "emote") as any;
        const mappedEmotes: Emote[] = emotes.map(emote => ({
            code: emote.name,
            endIndex: emote.position + emote.length,
            id: emote.id,
            startIndex: emote.position,
        }));

        const badges: ChatBadge[] = [];
        msg.userInfo.badges.forEach((value, key) => {
            badges.push({
                name: key,
                version: value,
            });
        });

        const event: ChatEvent = {
            badges: badges,
            bits: msg.bits,
            color: msg.userInfo.color,
            displayName: msg.userInfo.displayName,
            emotes: mappedEmotes,
            isMod: msg.userInfo.isMod,
            messageText: msg.message.value,
            senderUserId: msg.userInfo.userId || "",
            senderUsername: msg.userInfo.userName
        }

        callbacks.onChat(event);
    });

    chatClient.onHosted((channel, byChannel, auto, viewers) => {
        console.log("hosted");
        callbacks.onHost({
            channel: byChannel,
            viewers: viewers || 0,
            auto,
        });
    });

    chatClient.onRaid((channel, user, raidInfo, msg) =>{
       callbacks.onRaid(raidInfo);
    });

    await chatClient.connect();

    return callbacks;
}