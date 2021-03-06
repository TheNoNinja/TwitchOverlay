import {ApiClient, ChatBadgeList, HelixUser} from "twitch";

export async function getBadges(apiClient: ApiClient, user: HelixUser): Promise<Record<string, string>> {
    const badges: ChatBadgeList = await apiClient.badges.getChannelBadges(user, true);
    const output: Record<string, string> = {};

    badges.badgeSetNames.forEach(name => {
        const set = badges.getBadgeSet(name);
        set.versionNames.forEach(version => {
            const badge = set.getVersion(version);
            output[`${name}-${version}`] = badge.getImageUrl(4);
        });
    });

    return output;
}