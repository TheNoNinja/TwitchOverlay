export const GetChannels = async (BroadCasterId) => {
    const AccessToken = localStorage.AccessToken;
    const ClientId = localStorage.ClientId;

    if (AccessToken === undefined || ClientId === undefined || BroadCasterId === undefined) return undefined;

    const url = "https://api.twitch.tv/helix/channels?broadcaster_id=" + BroadCasterId;
    const headers ={
        "Authorization": "Bearer " + AccessToken,
        "Client-Id": ClientId
    }
    const response = await fetch(url, {headers});
    return await response.json();
}