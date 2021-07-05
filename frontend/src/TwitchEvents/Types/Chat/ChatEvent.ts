import type {EventTemplate} from "../EventTemplate";
import type {ChatMessage} from "./ChatMessage";

export type ChatEvent = EventTemplate<"CHAT", ChatMessage>;