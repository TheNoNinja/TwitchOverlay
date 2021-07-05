export type SubGiftDetail = {
    context: "subgift" | "anonsubgift",
    subPlan: "1000" | "2000" | "3000",
    recipientId: string,
    recipientUserName: string,
    recipientDisplayName: string,
    months: number,
}