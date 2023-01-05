import {EventType} from "./EventType";
import {AlgoritmEvent} from "./AlgoritmEvent";

export class AlgoritmEventHandler {
    private events: AlgoritmEvent[] = []

    public constructor(algoritmName: string) {
        this.events.push({
            id: this.events.length,
            eventType: EventType.INIT,
            date: new Date(),
            value: `${algoritmName ?? 'анонимный'}`
        });
    }

    public getEvents() {
        if(this.events[-1]?.eventType != EventType.FINISH
            || this.events[-1]?.eventType != EventType.FAIL)
            console.warn(`Попытка получить события алгоритма до его завершения!`);

        return this.events;
    }

    public static getValueString(event: AlgoritmEvent): string {
        if(typeof(event.value) === 'string')
            return event.value

        if(event.value
            && event.value.hasOwnProperty('index1')
            && event.value.hasOwnProperty('index2'))
            return `(${event.value['index1' as keyof typeof event.value]}; ${event.value['index2' as keyof typeof event.value]})`


        if(event.value
            && event.value.hasOwnProperty('pointerName')
            && event.value.hasOwnProperty('positionIndex'))
            return `(${event.value['pointerName' as keyof typeof event.value]}; ${event.value['positionIndex' as keyof typeof event.value]})`

        if(event.value
            && Array.isArray(event.value))
            return `[${event.value.join(', ')}]`

        return ''
    }

    public static getDataForSort(events: AlgoritmEvent[]) {
        const lastEventResult = events.find(item => item.eventType === EventType.START)?.value

        let data:number[] = [];
        if(lastEventResult && Array.isArray(lastEventResult))
            data = lastEventResult
        else
            console.warn('Последнее состояние не содержит массив значений');

        return data
    }

    public static getResultSort(events: AlgoritmEvent[]) {
        const lastEventResult = events.find(item => item.eventType === EventType.FINISH)?.value

        let sortedData:number[] = [];
        if(lastEventResult && Array.isArray(lastEventResult))
            sortedData = lastEventResult
        else
            console.warn('Последнее состояние не содержит массив значений');

        return sortedData
    }

    public swap(index1:number, index2:number) {
        this.events.push({
            id: this.events.length,
            eventType: EventType.SWAP,
            date: new Date(),
            value: {index1, index2}
        });
    }

    public check(index1:number, index2:number) {
        this.events.push({
            id: this.events.length,
            eventType: EventType.CHECK,
            date: new Date(),
            value: {index1, index2}
        });
    }

    public start(data:number[]) {
        this.events.push({
            id: this.events.length,
            eventType: EventType.START,
            date: new Date(),
            value: data
        });
    }

    public finish(sortedData:number[]) {
        this.events.push({
            id: this.events.length,
            eventType: EventType.FINISH,
            date: new Date(),
            value: sortedData
        });
    }

    public fail(fail: string) {
        this.events.push({
            id: this.events.length,
            eventType: EventType.FAIL,
            date: new Date(),
            value: fail
        });
    }


    public createPointer(pointerName:string, positionIndex:number) {
        this.events.push({
            id: this.events.length,
            eventType: EventType.CREATE_POINTER,
            date: new Date(),
            value: {pointerName, positionIndex}
        });
    }

    public shiftPointer(pointerName:string, positionIndex:number) {
        this.events.push({
            id: this.events.length,
            eventType: EventType.SHIFT_POINTER,
            date: new Date(),
            value: {pointerName, positionIndex}
        });
    }

    public createOrShiftPointer() {
        throw new Error('Не реализовано (createOrShiftPointer)');
    }

    public deletePointer(pointerName:string) {
        this.events.push({
            id: this.events.length,
            eventType: EventType.DELETE_POINTER,
            date: new Date(),
            value: pointerName
        });
    }

    public createNewArray() {
        throw new Error(`Метод setCreateNewArray не реализован!`);
    }
}