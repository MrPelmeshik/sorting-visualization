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

    // region static handler
    public static getFirstEvent(events: AlgoritmEvent[]): AlgoritmEvent {
        return events[1]
    }

    public static getDateForFirstEvent(events: AlgoritmEvent[]): Date {
        return events[1].date
    }

    public static getDateByEventId(id:number, events: AlgoritmEvent[]): Date | undefined {
        return events.find(event => event.id === id)?.date
    }

    public static getExecutionTime(event: AlgoritmEvent, events: AlgoritmEvent[]): string {
        const firstDate = this.getDateForFirstEvent(events);
        const prevDate = event.id !== this.getFirstEvent(events)?.id
            ? firstDate
            : event.date;
        return `${Math.abs(event.date.getTime() - firstDate.getTime()) / 1000}ms (+${Math.abs(event.date.getTime() - prevDate.getTime()) / 1000}ms)`
    }

    public static getEventDataString(event: AlgoritmEvent): string {
        return `${this.getTypeString(event)} ${this.getValueString(event)}`
    }

    public static getTypeString(event: AlgoritmEvent): string {
        let strType
        switch (event.eventType) {
            case EventType.INIT:
                strType = 'Инициализация'
                break;
            case EventType.START:
                strType = 'Запуск сортировки'
                break;
            case EventType.FINISH:
                strType = 'Завершение сортировки'
                break;
            case EventType.CHECK:
                strType = 'Сверка значений'
                break;
            case EventType.SWAP:
                strType = 'Смена значений'
                break;
            case EventType.CREATE_POINTER:
                strType = 'Создание указателя'
                break;
            case EventType.SHIFT_POINTER:
                strType = 'Перемещение указателя'
                break;
            case EventType.DELETE_POINTER:
                strType = 'Удаление указателя'
                break;
            default:
                strType = `${EventType[event.eventType]} (Неизвестное событие)`
        }

        return strType
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

    public static getIndexesForSwap(event: AlgoritmEvent): number[] {
        if(event.value
            && event.value.hasOwnProperty('index1')
            && event.value.hasOwnProperty('index2'))
            return [event.value['index1' as keyof typeof event.value], event.value['index2' as keyof typeof event.value]]

        console.warn(`Невозможно обменять элементы (event.id: ${event.id})`)
        return [-1, -1]
    }

    public static getIndexesInEvent(event: AlgoritmEvent): number[] {
        let indexForEvent: number[] = []
        if(event.value
            && event.value.hasOwnProperty('index1')
            && event.value.hasOwnProperty('index2'))
            indexForEvent.push(
                event.value['index1' as keyof typeof event.value],
                event.value['index2' as keyof typeof event.value]
            )

        if(event.value
            && event.value.hasOwnProperty('pointerName')
            && event.value.hasOwnProperty('positionIndex'))
            indexForEvent.push(event.value['positionIndex' as keyof typeof event.value])

        return indexForEvent;
    }
    // endregion

    // region add events
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
    // endregion
}