import type {SubMessage} from "./SubMessage";

export type SubDetail = {
    context: "sub" | "resub",
    subPlan: "Prime" | "1000" | "2000" | "3000",
    subMessage: SubMessage | null,
    cumulativeMonths: number,
    streakMonths: number,
}