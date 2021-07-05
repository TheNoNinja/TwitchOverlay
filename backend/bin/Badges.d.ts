import { ApiClient, HelixUser } from "twitch";
export declare function getBadges(apiClient: ApiClient, user: HelixUser): Promise<Record<string, string>>;
