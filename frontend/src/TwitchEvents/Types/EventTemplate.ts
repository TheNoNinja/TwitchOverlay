export type EventTemplate<TYPE extends string, PAYLOAD> = {
    id: number,
    type: TYPE,
    payload: PAYLOAD,
}