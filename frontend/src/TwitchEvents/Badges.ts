import {writable, Writable} from "svelte/store";

export const badgeIdStore: Writable<Record<string, string>> = writable();