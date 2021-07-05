import type {ChatEvent} from "./Types/Chat/ChatEvent";
import {derived, Readable, writable} from "svelte/store";

type ChatQueue = ChatEvent[];
const {update, subscribe} = writable<ChatQueue>([]);

export const chatQueue: Readable<ChatQueue> & {
    addMessage: (chatEvent: ChatEvent) => void,
    clearMessage: (id: ChatEvent["id"]) => void,
} = {
    subscribe,
    addMessage: (chatEvent: ChatEvent) => {
        onNewMessage(chatEvent);
        update(oldState => [...oldState, chatEvent]);
    },
    clearMessage: (id: ChatEvent["id"]) => {
        update(oldState => oldState.filter(message => message.id !== id));
    },
}

const messageDuration = 10 * 1000;
function onNewMessage(chatEvent: ChatEvent) {
    setTimeout(() => {
        chatQueue.clearMessage(chatEvent.id);
    }, messageDuration);
}

export const chatDisplayQueue: Readable<ChatQueue> = derived(chatQueue, queue => queue.filter(({payload}) => {
    if (payload.messageText.startsWith("!")) return false;
    if (payload.displayName.toLowerCase() === "nightbot") return false;
    if (payload.messageText.split(" ").length === 1 && (payload.messageText.startsWith("www.") || payload.messageText.startsWith("http"))) return false;
    return true;
}));