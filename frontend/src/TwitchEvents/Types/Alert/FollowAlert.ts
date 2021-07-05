import type {EventTemplate} from "../EventTemplate";

export type FollowAlert = EventTemplate<"FOLLOW", {
    userDisplayName: string,
}>