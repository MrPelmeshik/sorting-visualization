import {AlgoritmEvent} from "../AlgoritmEvent";
import {AlgoritmEventHandler} from "../AlgoritmEventHandler";
import {IAlgoritm} from "../IAlgoritm";


export class BobleSortAlgoritm implements IAlgoritm{
    private readonly algoritmName = 'Тестовый алгоритм (сортировка пузырьком)'
    private readonly data: number[];
    private readonly eventHandler: AlgoritmEventHandler;

    public constructor(data: number[]) {
        this.eventHandler = new AlgoritmEventHandler(this.algoritmName);
        this.data = data.slice();
    }

    public getName() {
        return this.algoritmName;
    }

    public do(): AlgoritmEvent[] {
        this.eventHandler.start(this.data.slice());

        for (let i = 0; i < this.data.length; i++) {
            i === 0
                ? this.eventHandler.createPointer('i', i)
                : this.eventHandler.shiftPointer('i', i);

            for (let j = i + 1; j < this.data.length; j++) {
                j === i+1
                    ? this.eventHandler.createPointer('j', j)
                    : this.eventHandler.shiftPointer('j', j);

                this.eventHandler.check(i, j);
                if(this.data[i] > this.data[j]) {
                    this.eventHandler.swap(i, j);
                    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
                }
            }
            this.eventHandler.deletePointer('j');
        }
        this.eventHandler.deletePointer('i');

        this.eventHandler.finish(this.data.slice());
        return this.eventHandler.getEvents();
    }
}