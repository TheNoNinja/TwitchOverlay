import type {ChatBadge} from "./ChatBadge";
import type {ChatEmote} from "./ChatEmote";

export type ChatMessage = {
    messageText: string,
    senderUsername: string,
    senderUserId: string,
    badges: Array<ChatBadge>,
    bits: number | undefined,
    color: string | undefined,
    displayName: string,
    emotes: Array<ChatEmote>,
    isMod: boolean,
}