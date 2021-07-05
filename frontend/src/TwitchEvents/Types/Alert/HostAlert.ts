import type {EventTemplate} from "../EventTemplate";

export type HostAlert = EventTemplate<"HOST", {
    channel: string,
    auto: boolean,
}>