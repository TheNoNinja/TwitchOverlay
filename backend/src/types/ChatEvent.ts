import {ChatBadge} from "./ChatBadge";
import {Emote} from "./Emote";

export type ChatEvent = {
    messageText: string,
    senderUsername: string,
    senderUserId: string,
    badges: Array<ChatBadge>,
    bits: number | undefined,
    color: string | undefined,
    displayName: string,
    emotes: Array<Emote>,
    isMod: boolean
}