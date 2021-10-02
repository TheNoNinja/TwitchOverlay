<script>
    import Card from "$lib/components/cards/centered-card.svelte";
    import TextInput from "$lib/components/forms/text-input.svelte";
    import Button from "$lib/components/forms/button.svelte";
    import CopyIcon from "$lib/components/icons/copy-icon.svelte";
    import Link from "$lib/components/external-link/external-link.svelte";
    import ErrorNotification from "$lib/components/notifications/error-notification.svelte";
    import {onMount} from "svelte";
    import {page} from "$app/stores";

    let ClientId;
    let ClientSecret;
    let State = "";
    let Error;
    let ShowError = false;
    let RememberSecret = false;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    onMount(() => {
        if (localStorage.RememberSecret !== undefined) RememberSecret = localStorage.RememberSecret;
        if (localStorage.ClientId !== undefined) ClientId = localStorage.ClientId;
        if (RememberSecret && localStorage.ClientSecret !== undefined) ClientSecret = localStorage.ClientSecret;

        if (localStorage.ClientId !== undefined) document.getElementById("ClientId").value = ClientId;
        if (RememberSecret && localStorage.ClientSecret !== undefined) document.getElementById("ClientSecret").value = ClientSecret;

        if ($page.query.get("errorMessage") !== null){
            Error = $page.query.get("errorMessage");
            ShowError = true;
        }
    });

    const GenerateState = (length) => {
        State = "";
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            State += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    }

    const OnSubmit = () => {
        if (ClientId === undefined || ClientSecret === undefined || ClientId === "" || ClientSecret === "") return;

        GenerateState(16);

        localStorage.ClientId = ClientId;
        localStorage.ClientSecret = ClientSecret;
        localStorage.AuthState = State;
        localStorage.RememberSecret = RememberSecret;
        const url = `https://id.twitch.tv/oauth2/authorize?client_id=${ClientId}&redirect_uri=http://localhost:8080/api/auth/callback&response_type=code&scope=bits:read%20channel:edit:commercial%20channel:manage:broadcast%20channel:manage:polls%20channel:manage:predictions%20channel:manage:redemptions%20channel:read:hype_train%20channel:read:polls%20channel:read:predictions%20channel:read:redemptions%20channel:read:subscriptions%20moderation:read%20user:edit&state=${State}`;
        try {
            fetch(url).then(response => {
                response.json().then(data => {
                    window.location = `http://${$page.host}?errorMessage=${data.message}`;
                });
            });
        } catch (e) {}
        window.location = url;
    }

</script>

<Card>
    <div class="space-y-6">

        <TextInput bind:value={ClientId} Id="ClientId">Client id:</TextInput>

        <TextInput bind:value={ClientSecret} Id="ClientSecret" Type="password">Client secret:</TextInput>

        <div>
            <p class="block font-bold text-gray-900 dark:text-gray-400 text-xl">Callback url:</p>
            <div class="select-all bg-gray-200 dark:bg-gray-900 rounded-md py-2 px-3 inline-flex justify-between w-full cursor-text">
                <p>http://locahost:8080/api/auth/callback</p>
                <CopyIcon/>
            </div>
        </div>

        <div class="flex items-center justify-between">
            <div class="flex items-center cursor-pointer" on:click={() => RememberSecret = !RememberSecret}>
                <button type="button" class="{RememberSecret ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-900'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200" role="switch" aria-checked="false">
                    <span aria-hidden="true" class="{RememberSecret ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-800 shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
                <span for="remember-secret" class="ml-2 block text-md text-gray-900 dark:text-gray-200">
                    Remember client secret
                </span>
            </div>
        </div>

        <Button OnClickCallback={OnSubmit} IsFullWidth="True">Login with twitch using custom app credentials</Button>

        {#if ShowError}
            <ErrorNotification Message="{Error}" OnDismiss="{() => ShowError = false}"/>
        {/if}
        <div>
            <p>For information on how to get a client id and secret visit: <Link Href="https://dev.twitch.tv/console/apps">https://dev.twitch.tv/</Link></p>
        </div>
    </div>
</Card>