import {currentAlertStore} from "./Alerts";
import {chatQueue} from "./Chat";
import {badgeIdStore} from "./Badges";
import type {Event} from "./Types/Event";

export function registerEvent(event: Event) {
    if (event.type === "CHAT"){
        chatQueue.addMessage(event);
    }
    else if (event.type === "BADGES"){
        badgeIdStore.set(event.payload)
    }
    else {
        currentAlertStore.addToQueue(event);
    }
}