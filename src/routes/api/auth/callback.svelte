<script>
    import {page} from "$app/stores";
    import {onMount} from "svelte";

    $: state = $page.query.get("state");
    $: authToken = $page.query.get("code");

    onMount(() => {
        if ($page.query.get("state") !== localStorage.AuthState){
            //window.location = "http://localhost:8080/?errorMessage=Return state differed from request";
            return;
        }

        localStorage.AuthToken = $page.query.get("code");

        const url = `https://id.twitch.tv/oauth2/token?client_id=${localStorage.ClientId}&client_secret=${localStorage.ClientSecret}&code=${localStorage.AuthToken}&grant_type=authorization_code&redirect_uri=http://localhost:8080/api/auth/callback`
        fetch(url, {method: "POST"}).then(response => {
            response.json().then(data => {
                if (data.status !== undefined) {
                    window.location = `http://localhost:8080/?errorMessage=${data.message}`;

                }
                localStorage.AccessToken = data.access_token;
                localStorage.RefreshToken = data.refresh_token;
                localStorage.AccessTokenExpireTime = data.expires_in;
                localStorage.AquiredTokenOn = Math.floor( Date.now() / 1000 );
                window.location = `http://localhost:8080/dashboard`;
            }).catch(error => {
               console.log(error);
            });
        }).catch(error => {
            window.location = `http://localhost:8080/?errorMessage=${error}`;
        });
    });
</script>

AuthToken: {authToken}; State: {state}; LocalState: {localStorage.AuthState}