import type {EventTemplate} from "../EventTemplate";
import type {SubEvent} from "../Sub/SubEvent";

export type SubscribeAlert = EventTemplate<"SUBSCRIBE", SubEvent>;