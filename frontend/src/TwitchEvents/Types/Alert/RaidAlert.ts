import type {EventTemplate} from "../EventTemplate";

export type RaidAlert = EventTemplate<"RAID", {
    displayName: string,
    viewerCount: number,
}>