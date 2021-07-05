<script lang="ts">
    import type { Alert } from "../../TwitchEvents/Types/Alert/Alert";
    import { currentAlertStore } from "../../TwitchEvents/Alerts";
    import {getParameterByName} from "../../Utils/Parameters";

    import FollowAlert from "./FollowAlert.svelte";
    import SubscribeAlert from "./SubscribeAlert.svelte";
    import {onMount} from "svelte";

    let position: string | null = null;
    onMount(() => {
        position = getParameterByName("position");
    });

    let alert:Alert | null;
    $: alert = $currentAlertStore;

    let type: Alert["type"] | null;
    $: type = alert === null ? null : alert.type;

    let payload: any;
    $: payload = alert === null ? null : alert.payload;
</script>
<div class="flex items-center h-screen w-screen">
    {#if type === "FOLLOW"}
        <FollowAlert payload="{payload}" position="{position}" timeToShow="5"/>
    {:else if type === "SUBSCRIBE"}
        <SubscribeAlert payload="{payload}" position="{position}" timeToShow="3"/>
    {/if}
</div>
