<script lang="ts">
    import {chatDisplayQueue} from "../../TwitchEvents/Chat";
    import ChatMessage from "./ChatMessage.svelte";
    import {fly} from "svelte/transition";
    import {flip} from "svelte/animate";

    const fadeout = (element) => {
        setTimeout(() => {
            element.classList.remove("opacity-100");
            element.classList.add("opacity-0");
        }, 29700);
    }
</script>

<ul class="space-y-3 flex-col items-end justify-end absolute bottom-6 left-6 right-6 overflow-hidden">
    {#each $chatDisplayQueue as chatEvent (chatEvent.id)}
        <div class="transition-opacity ease-in-out opacity-100 duration-300" in:fly={{y:150,duration: 300}} animate:flip={{duration: 300}} use:fadeout>
            <!-- TODO: Flip animation breaks the fade out for some reason :/
                       So that is why the custom fadeout is used.
                       The interval amount should be (chat seconds - duration)

                       https://stackoverflow.com/questions/68273921/svelte-animation-blocks-transition-->

            <ChatMessage event={chatEvent}/>
        </div>
    {/each}
</ul>