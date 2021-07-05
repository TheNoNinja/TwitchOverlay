import { ChatMessage } from "../Messages/ChatMessage";
export declare type SubDetail = {
    context: "sub" | "resub";
    subPlan: "Prime" | "1000" | "2000" | "3000";
    subMessage: ChatMessage | null;
    cumulativeMonths: number;
    streakMonths: number;
};
