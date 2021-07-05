<script lang="ts">
    import type {FollowAlert} from "../../TwitchEvents/Types/Alert/FollowAlert";
    import {currentAlertStore} from "../../TwitchEvents/Alerts";
    import { fly } from 'svelte/transition';
    import {onMount, onDestroy} from "svelte";

    export let payload: FollowAlert["payload"];
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

        interval = setInterval(() => {
            currentAlertStore.clear()
        }, timeToShow*1000);
    });

    onDestroy(() => clearInterval(interval));
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

    #follow-stroke {
        stroke: #c4c4c4;
        stroke-width: 4;
        stroke-dasharray: 18 162.6;
        stroke-dashoffset: 180.6;
        animation: line-image-animation 1s ease-in-out infinite;
    }

    #alert-container {
        --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow), var(--tw-shadow);
    }

    .position-left {
        left: 30px;
    }

    .position-right {
        right: 30px;
    }

</style>

<div id="alert-container" in:fly={{y:10}} out:fly={{y:-10}} class="p-6 w-sm mx-auto bg-gray-800 rounded-xl shadow-2xl flex items-center space-x-4 absolute position-left position-right">
    <div class="flex-shrink-0">
        <svg viewBox="-2 0 67 67" class="h-12 w-12" in:fly={{y:15}} out:fly={{y:-15}}>
            <path id="stroke" fill="none" stroke-width="6" stroke-linejoin="miter" stroke-miterlimit="10" d="M57.207,10.793 c-6.39-6.39-16.751-6.39-23.142,0c-0.787,0.787-1.472,1.636-2.066,2.529c-0.593-0.892-1.279-1.742-2.066-2.529 c-6.39-6.39-16.751-6.39-23.142,0c-6.391,6.39-6.391,16.751,0,23.142L32,59.142l25.207-25.207 C63.598,27.544,63.598,17.183,57.207,10.793z"/>
            <use id="follow-stroke" xlink:href="#stroke"></use>
        </svg>
    </div>
    <div class="flex-shrink-0">
        <div class="block" style="height: 1.5em">
            {#each [payload] as payload (payload)}
                <div class="text-xl font-medium h-0 text-gray-300" in:fly={{y:15}} out:fly={{y:-15}}>{payload.userDisplayName}</div>
            {/each}
        </div>
        <p class="text-gray-300" in:fly={{y:15}} out:fly={{y:-15}}>New follower!</p>
    </div>
</div>