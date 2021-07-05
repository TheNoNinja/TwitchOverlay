import type {ChatEvent} from "./Chat/ChatEvent";
import type {Alert} from "./Alert/Alert";
import type {BadgesEvent} from "./BadgesEvent";

export type Event = Alert | ChatEvent | BadgesEvent;