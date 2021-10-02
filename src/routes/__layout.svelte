<script lang="ts">
	import "../bundle.css";
	import { page } from "$app/stores";
	import { onMount } from 'svelte';

	import DarkModeListener from "$lib/components/dark-mode/dark-mode-listener.svelte";
	import TitleBar from "$lib/components/titlebar/titlebar.svelte";
	import Navbar from "$lib/components/navbar/navbar.svelte"


	let ready: boolean = false;
	onMount(() => {
		if ($page.host !== "localhost:8080") {
			window.location = "http://localhost:8080/";
		}
		if ($page.path !== "/" && !$page.path.startsWith("/overlay") && !$page.path.startsWith("/api/auth")){
			if (localStorage.AccessToken === undefined || localStorage.AccessTokenExpireTime === undefined || localStorage.AquiredTokenOn === undefined){
				window.location = "http://localhost:8080/";
			}
			const ExpiryDate = new Date();
			ExpiryDate.setDate(localStorage.AquiredTokenOn + localStorage.AccessTokenExpireTime);
			if (ExpiryDate < Date.now()){
				window.location = "http://localhost:8080/";
			}
		}
		ready = true;
	});
</script>

<svelte:head>
	<title>Twitch Overlay</title>
</svelte:head>

<DarkModeListener/>
{#if $page.path.startsWith("/overlay") || $page.path.startsWith("/api")}
	<slot/>
{:else}
	<div style="-webkit-user-select: none" class="bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200 w-screen min-h-screen h-full transition duration-200 ease-in-out">
		<TitleBar/>
		<div class="pt-6 flex w-screen min-h-screen h-full">
			{#if ready}
				{#if $page.path === "/"}
					<slot/>
				{:else}
					<Navbar>
						<slot/>
					</Navbar>
				{/if}
			{/if}
		</div>
	</div>
{/if}

