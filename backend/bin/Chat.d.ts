import { Callbacks } from "./types/Callbacks";
import { ENV } from "./types/ENV";
import { ApiClient } from "twitch";
export declare function initChat(callbacks: Callbacks, apiClient: ApiClient, { channelName }: ENV): Promise<Callbacks>;
