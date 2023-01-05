import {EventType} from "./EventType";

export type AlgoritmEvent = {
    id: number;
    eventType: EventType;
    date: Date;
    value?: string
        | ({index1: number, index2: number})
        | ({pointerName:string, positionIndex:number})
        | number[]
}