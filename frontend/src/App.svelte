<script>
	import {Router, Route} from "svelte-routing";
	import Dashboard from "./Views/Dashboard/Dashboard.svelte"
	import AlertController from "./Views/Alerts/AlertController.svelte";
	import Chat from "./Views/Chat/Chat.svelte";

	export let url = "";
</script>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>

<Router url="{url}">
	<Route path="/" component={Dashboard}/>
	<Route path="Dashboard/*" component="{Dashboard}"/>
	<Route path="alerts" component="{AlertController}"/>
	<Route path="chat" component="{Chat}"/>
</Router>
