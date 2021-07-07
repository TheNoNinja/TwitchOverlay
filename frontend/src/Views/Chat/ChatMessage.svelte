<script lang="ts">
    import type {ChatEvent} from "../../TwitchEvents/Types/Chat/ChatEvent";
    import type {ChatMessage} from "../../TwitchEvents/Types/Chat/ChatMessage";
    import type {ChatEmote} from "../../TwitchEvents/Types/Chat/ChatEmote";
    import type {EmoteToken} from "../../TwitchEvents/Types/Chat/EmoteToken";
    import type {TextToken} from "../../TwitchEvents/Types/Chat/TextToken";
    import type {ChatToken} from "../../TwitchEvents/Types/Chat/ChatToken";
    import type {ChatBadge} from "../../TwitchEvents/Types/Chat/ChatBadge";
    import Badge from "./Badge.svelte";
    import Emote from "./Emote.svelte";

    export let event: ChatEvent;

    let chatMessage: ChatMessage;
    $: chatMessage = event.payload;

    let name: string;
    $: name = chatMessage.displayName;

    let customColor: string | null;
    $: customColor = chatMessage.color ? chatMessage.color : null;

    const defaultColors = [
        "#FF7F50",
        "#9ACD32",
        "#FF4500",
        "#2E8B57",
        "#DAA520",
        "#D2691E",
        "#5F9EA0",
        "#1E90FF",
        "#FF69B4",
        "#8A2BE2",
        "#00FF7F",
    ];

    let defaultColor: string;
    $: defaultColor = defaultColors[name.charCodeAt(0) % 11];

    let color: string;
    $: color = customColor === null ? defaultColor : customColor;

    let emotes: ChatEmote[];
    $: emotes = chatMessage.emotes;

    let emoteTokens: EmoteToken[];
    $: emoteTokens = emotes.sort((a, b) => a.startIndex - b.endIndex).map(emote => ({
        type: "emote" as const,
        ...emote
    }));

    let messageText: string;
    $: messageText = chatMessage.messageText;

    let emoteTextBoundaries: number[];
    $: emoteTextBoundaries = [0, ...emotes.flatMap(emote => [emote.startIndex, emote.endIndex]), messageText.length].sort((a, b) => a - b);

    let nonEmoteBoundaries: [number, number | undefined][];
    $: nonEmoteBoundaries = emoteTextBoundaries.reduce((acc: [number, number | undefined][], elem: number) => {
        const newAcc = acc.slice();
        if (acc.length > 0 && acc[acc.length - 1][1] === undefined) {
            newAcc[newAcc.length - 1][1] = elem;
        } else {
            newAcc.push([elem, undefined]);
        }
        return newAcc;
    }, []);

    let textSlices: [number, number][];
    $: textSlices = nonEmoteBoundaries.filter(pair => pair[1] !== undefined) as [number, number][];

    let textTokens: TextToken[];
    $: textTokens = textSlices.map(([start, end]) => ({
        type: "text",
        startIndex: start,
        endIndex: end,
        content: messageText.slice(start, end),
    }));

    let tokens: ChatToken[];
    $: tokens = [...emoteTokens, ...textTokens].filter(({
                                                            startIndex,
                                                            endIndex
                                                        }) => startIndex !== endIndex).sort((a, b) => a.startIndex - b.startIndex);

    let badges: ChatBadge[];
    $: badges = chatMessage.badges;
</script>

<li class="bg-gray-800 text-gray-300 shadow overflow-hidden rounded-md px-6 py-4 flex shadow-lg">
    <div>
        <div class="flex">
            {#each badges as badge (badge.name)}
                <Badge name={badge.name} version={badge.version} />
            {/each}
            <h4 class="text-lg font-bold" style="color: {color};">{name}</h4>
        </div>
        <p class="mt-1">
            {#each tokens as token (token.startIndex)}
                {#if token.type === "text"}
                    {token.content}
                {:else}
                    <Emote id={token.id} code={token.code}/>
                {/if}
            {/each}
        </p>
    </div>
</li>
