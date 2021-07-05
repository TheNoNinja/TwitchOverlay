<script lang="ts">
    import type {SubscribeAlert} from "../../TwitchEvents/Types/Alert/SubscribeAlert";
    import {currentAlertStore} from "../../TwitchEvents/Alerts";
    import {fly} from 'svelte/transition';
    import {onDestroy, onMount} from "svelte";

    export let payload: SubscribeAlert["payload"];
    export let timeToShow: Number;
    export let position: string;

    let interval;
    onMount(() => {
        if (position !== null && position !== ""){
            if (position === "right"){
                document.getElementById("alert-container").classList.remove("position-left");
            }
            if (position === "left"){
                document.getElementById("alert-container").classList.remove("position-right");
            }
        }

        [...document.getElementsByClassName("auto-width")].forEach((autoWidthElement) => {
            autoWidthElement.style.width = 'auto';
            const rect = autoWidthElement.getBoundingClientRect();
            autoWidthElement.style.width = `${rect.width}px`;
        });
        interval = setInterval(() => {
            currentAlertStore.clear();
            setTimeout(updateAutoWidth, 50)
        }, timeToShow*1000);
    });

    onDestroy(() => clearInterval(interval));

    const updateAutoWidth = () => {
        [...document.getElementsByClassName("auto-width")].forEach((autoWidthElement) => {
            const currentRect = autoWidthElement.getBoundingClientRect();
            const currentWidth = `${currentRect.width}px`;

            autoWidthElement.style.width = 'auto';
            const rect = autoWidthElement.getBoundingClientRect();
            const newWidth = `${rect.width}px`;

            autoWidthElement.style.width = currentWidth;

            requestAnimationFrame(() => {
                autoWidthElement.style.width = newWidth;
            });
        });
    }
</script>

<style>
    @keyframes line-image-animation {
        to {
            stroke-dashoffset: 0;
        }
    }

    svg {
        stroke-linecap: round;
        fill:none;
        stroke: #6441A5;
    }

    #sub-stroke {
        stroke: #c4c4c4;
        stroke-width: 4;
        animation: line-image-animation 1s ease-in-out infinite;
    }

    #alert-container {
        --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow), var(--tw-shadow);
    }

    .auto-width {
        height: 1.5em;
        transition: width .2s ease-out;
    }

    .position-left {
        left: 30px;
    }

    .position-right {
        right: 30px;
    }

</style>

<div id="alert-container" in:fly={{y:10}} out:fly={{y:-10}} class="p-6 mx-auto bg-gray-800 rounded-xl shadow-2xl flex items-center space-x-4 absolute position-left position-right">
    <div class="flex-shrink-0">
        <svg viewBox="-5 -5 58 58" class="h-12 w-12" in:fly={{y:15}} out:fly={{y:-15}}>
            <path id="stroke" stroke-linecap="round" stroke-width="4" fill="none" stroke-linejoin="miter" stroke-miterlimit="10" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
            <use id="sub-stroke" xlink:href="#stroke" stroke-dasharray="17.916 179.16" stroke-dashoffset="197"></use>
        </svg>
    </div>
    <div class="flex-shrink-0">
        <div class="auto-width">
            {#each [payload] as payload (payload)}
                <div class="text-xl font-medium block h-0 text-gray-300" in:fly={{y:15}} out:fly={{y:-15}}>
                    {#if payload.context === "sub"}
                        {payload.userDisplayName}
                    {:else if payload.context === "resub"}
                        {payload.userDisplayName}
                    {:else if payload.context === "subgift"}
                        {payload.recipientDisplayName}
                    {:else if payload.context === "anonsubgift"}
                        {payload.recipientDisplayName}
                    {/if}
                </div>
            {/each}
        </div>
        <div class="auto-width overflow-x-hidden overflow-y-hidden">
            {#each [payload] as payload (payload)}
                <p class="text-gray-300 whitespace-nowrap block h-0" in:fly={{y:15}} out:fly={{y:-15}}>
                    {#if payload.context === "sub"}
                        Just subscribed!
                    {:else if payload.context === "resub"}
                        Just resubscribed!
                    {:else if payload.context === "subgift"}
                        Got gifted a sub by {payload.userName}!
                    {:else if payload.context === "anonsubgift"}
                        Got gifted a sub by anonymous!
                    {/if}
                </p>
            {/each}
        </div>
    </div>
</div>