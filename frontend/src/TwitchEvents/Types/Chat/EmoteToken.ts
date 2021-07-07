import type {ChatEmote} from "./ChatEmote";

export type EmoteToken = ChatEmote & {
    type: "emote";
}