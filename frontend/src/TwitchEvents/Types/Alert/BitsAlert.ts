import type {EventTemplate} from "../EventTemplate";

export type BitsAlert = EventTemplate<"BITS", {
    bits: number,
    message: string,
    userName: string,
}>