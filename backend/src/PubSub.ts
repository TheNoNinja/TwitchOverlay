import {Callbacks} from "./types/Callbacks";
import {ENV} from "./types/ENV";
import {MessageInfo} from "./types/Messages/MessageInfo";
import {ApiClient, HelixUser} from "twitch";
import {PubSubClient, PubSubBitsMessage, PubSubSubscriptionMessage, PubSubRedemptionMessage} from "twitch-pubsub-client";
import {SubDetail} from "./types/Subs/SubDetail";
import {SubGiftDetail} from "./types/Subs/SubGiftDetail";
import {SubEvent} from "./types/Subs/SubEvent";
import {randomName, randomNumber} from "./Utils/Random";

export async function initPubSub(callbacks: Callbacks, apiClient: ApiClient, user: HelixUser, {}:ENV): Promise<Callbacks> {
    const client = new PubSubClient();
    await client.registerUserListener(apiClient, user);

    await client.onSubscription(user, (subscription: PubSubSubscriptionMessage) => {
        console.log(`Subscription from: ${subscription.userDisplayName}`);
        const messageInfo: MessageInfo = {
            time: subscription.time,
            userId: subscription.isGift ? (subscription.isAnonymous ? "Anonymous" : subscription.gifterId as string) : subscription.userId,
            userName: subscription.isGift ? (subscription.isAnonymous ? "Anonymous" : subscription.gifterName as string) : subscription.userName,
            userDisplayName: subscription.isGift ? (subscription.isAnonymous ? "Anonymous" : subscription.gifterDisplayName as string) : subscription.userDisplayName
        }

        const subDetail: SubGiftDetail | SubDetail = subscription.isGift ? {
            context: subscription.isAnonymous ? "anonsubgift" : "subgift",
            subPlan: subscription.subPlan as "1000" | "2000" | "3000",
            months: subscription.months,
            recipientDisplayName: subscription.userDisplayName,
            recipientId: subscription.userId,
            recipientUsername: subscription.userName,
        } : {
            context: subscription.isResub ? "resub" : "sub",
            subPlan: subscription.subPlan as "Prime" | "1000" | "2000" | "3000",
            cumulativeMonths: subscription.cumulativeMonths,
            streakMonths: subscription.streakMonths,
            subMessage: subscription.message
        }

        const subEvent: SubEvent = {
            ...messageInfo,
            ...subDetail
        }

        callbacks.onSubscribe(subEvent);
    });

    await client.onBits(user, async (bits: PubSubBitsMessage) => {
        const userId = bits.userId === undefined || bits.isAnonymous ? null : bits.userId;
        const user = userId === null ? null : await apiClient.helix.users.getUserById(userId);
        const displayName = user === null ? bits.userName : user.displayName;
        callbacks.onBits({
            bits: bits.bits,
            isAnonymous: bits.isAnonymous,
            message: bits.message,
            totalBits: bits.totalBits,
            userId: userId || "Anonymous",
            userName: displayName || "Anonymous",
        });

    });

    await client.onRedemption(user, async (redemption: PubSubRedemptionMessage) => {
       if (redemption.rewardName.toLowerCase() === "party") {
           callbacks.onParty();
       }
    });

    callbacks.debugSubscribe = () => {
        console.log("Debug Subscribe");
        callbacks.onSubscribe({
            cumulativeMonths: randomNumber(),
            streakMonths: randomNumber(),
            context: "sub",
            subMessage: {
                emotes: [],
                message: "Debug subscribe message",
            },
            subPlan: "Prime",
            time: new Date(),
            userId: randomName(),
            userName: randomName(),
            userDisplayName: randomName()
        });
    }

    callbacks.debugReSubscribe = () => {
        console.log("Debug Subscribe");
        callbacks.onSubscribe({
            cumulativeMonths: randomNumber(),
            streakMonths: randomNumber(),
            context: "resub",
            subMessage: {
                emotes: [],
                message: "Debug subscribe message",
            },
            subPlan: "Prime",
            time: new Date(),
            userId: randomName(),
            userName: randomName(),
            userDisplayName: randomName()
        });
    }

    callbacks.debugGiftSubscribe = () => {
        console.log("Debug Gift Subscribe");
        callbacks.onSubscribe({
            context: "subgift",
            months: randomNumber(),
            recipientId: randomName(),
            recipientUsername: randomName(),
            recipientDisplayName: randomName(),
            userId: randomName(),
            userName: randomName(),
            userDisplayName: randomName(),
            time: new Date(),
            subPlan: "1000"
        });
    }

    callbacks.debugAnonGiftSubscribe = () => {
        console.log("Debug Gift Subscribe");
        callbacks.onSubscribe({
            context: "anonsubgift",
            months: randomNumber(),
            recipientId: randomName(),
            recipientUsername: randomName(),
            recipientDisplayName: randomName(),
            userId: randomName(),
            userName: randomName(),
            userDisplayName: randomName(),
            time: new Date(),
            subPlan: "1000"
        });
    }

    return callbacks;
}