import {AlgoritmEvent} from "../AlgoritmEvent";

export interface IAlgoritm {
    getName(): string
    do(): AlgoritmEvent[]
}