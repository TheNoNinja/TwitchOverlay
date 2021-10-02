export const GetUsers = async () => {
    const AccessToken = localStorage.AccessToken;
    const ClientId = localStorage.ClientId;
    const url = "https://api.twitch.tv/helix/users";
    const headers ={
        "Authorization": "Bearer " + AccessToken,
        "Client-Id": ClientId
    }
    if (AccessToken === undefined || ClientId === undefined) return undefined;

    const response = await fetch(url, {headers});
    return await response.json();;
}