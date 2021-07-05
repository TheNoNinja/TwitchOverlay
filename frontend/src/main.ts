// @ts-ignore
import App from './App.svelte';
import * as listener from "./TwitchEvents/Listener";

listener.initialise();

const app = new App({
	target: document.body,
	hydrate: true
});

export default app;