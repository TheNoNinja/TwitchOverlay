import {WebSocketClient} from "./Websocket";
import {registerEvent} from "./Events";
import type {Event} from "./Types/Event";

export function initialise() {
    const websocket = new WebSocketClient(`ws://localhost:8080/events`);

    let id = 0;
    websocket.onMessage = message => {
        const event: Event = JSON.parse(message.data);
        event.id = id++;
        registerEvent(event);
    }
}