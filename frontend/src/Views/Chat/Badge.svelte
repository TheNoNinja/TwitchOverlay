<script lang="ts">
    import {badgeIdStore} from "../../TwitchEvents/Badges";

    export let name: string;
    export let version: string;

    let index:string;
    $: index = `${name}-${version}`;

    let urls: Record<string, string>;
    $: urls = $badgeIdStore;

    let url: string | undefined;
    $: url = index in urls ? urls[index as keyof typeof urls] : undefined;
</script>

{#if url !== undefined}
    <span class="inline-block bg-no-repeat bg-center bg-contain overflow-hidden h-5 w-5 mt-1 mr-1" style={`background-image: url(${url})`}></span>
{/if}