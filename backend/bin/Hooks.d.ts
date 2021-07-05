import { ApiClient, HelixUser } from "twitch";
import { Callbacks } from "./types/Callbacks";
import { ENV } from "./types/ENV";
export declare function initHooks(callbacks: Callbacks, apiClient: ApiClient, user: HelixUser, env: ENV): Promise<Callbacks>;
