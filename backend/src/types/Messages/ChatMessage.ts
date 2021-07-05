import {ChatMessageEmote} from "./ChatMessageEmote";

export type ChatMessage = {
    message: string;
    emotes: ChatMessageEmote[];
}