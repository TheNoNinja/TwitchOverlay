import { Readable, writable, derived, Writable } from "svelte/store";
import type {Alert} from "./Types/Alert/Alert";

type AlertQueue = Alert[];
const alertQueueStore: Writable<AlertQueue> = writable([]);

const currentAlertInner = derived(alertQueueStore, alertQueue => {
   if (alertQueue.length === 0) return null;
   return alertQueue[0];
});

export const currentAlertStore: Readable<Alert | null> & {
    clear: () => void,
    addToQueue: (alert: Alert) => void,
} = {
    ...currentAlertInner,
    clear: () => {
        alertQueueStore.update(state => {
            return state.slice(1);
        });
    },
    addToQueue: (alert: Alert) => {
        alertQueueStore.update(state => {
           return [...state, alert];
        });
    }
}