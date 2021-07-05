import { Callbacks } from "./types/Callbacks";
import { ENV } from "./types/ENV";
import { ApiClient, HelixUser } from "twitch";
export declare function initPubSub(callbacks: Callbacks, apiClient: ApiClient, user: HelixUser, {}: ENV): Promise<Callbacks>;
