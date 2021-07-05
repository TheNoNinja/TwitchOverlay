import {HelixFollow} from "twitch";
import {ChatRaidInfo} from "twitch-chat-client";
import {ChatEvent} from "./ChatEvent";
import {HostEvent} from "./HostEvent";
import {BitsEvent} from "./BitsEvent";
import {SubEvent} from "./Subs/SubEvent";

export type Callbacks = {
    onFollow: (follow: HelixFollow) => void,
    onSubscribe: (subscriptionEvent: SubEvent) => void,
    onBits: (bitsEvent: BitsEvent) => void;
    onChat: (chat: ChatEvent) => void;
    onHost: (host: HostEvent) => void;
    onRaid: (raid: ChatRaidInfo) => void;
    onParty: () => void;
    onBadges: (badges: Record<string, string>) => void;
    debugFollow: () => void;
    debugSubscribe: () => void;
    debugReSubscribe: () => void;
    debugGiftSubscribe: () => void;
    debugAnonGiftSubscribe: () => void;
    debugBits: () => void;
    debugChat: () => void;
    debugHost: () => void;
    debugRaid: () => void;

}