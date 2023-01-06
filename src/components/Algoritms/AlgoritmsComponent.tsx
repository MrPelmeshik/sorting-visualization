import React, {Dispatch, useEffect, useState} from "react";
import {AlgoritmEvent} from "./AlgoritmEvent";
import {BobleSortAlgoritm} from "./SortAlgoritms/BobleSortAlgoritm";
import {EventType} from "./EventType";
import {AlgoritmEventHandler} from "./AlgoritmEventHandler";
import './Algoritm.css'
import {Collapse} from "@consta/uikit/Collapse";
import {Button} from "@consta/uikit/Button";
import {Select} from "@consta/uikit/Select";
import {IAlgoritm} from "./IAlgoritm";


type AlgoritmItem = {
    id: number
    label: string
};

const algoritmItems: AlgoritmItem[] = [
    {
        id: 1,
        label: 'Тестовый алгоритм (сортировка пузырьком)'
    },
    {
        id: 2,
        label: 'Второй'
    },
    {
        id: 3,
        label: 'Третий'
    },
];

const getAlgoritmById = (id:number, data:number[]) => {
    switch (id) {
        case 1:
            return new BobleSortAlgoritm(data)
            break;
        default:
            throw new Error(`Не найден алгоритм с заданным id (id:${id})`);
    }
}

export const AlgoritmsComponent:React.FC<{
    data:number[],
    events:AlgoritmEvent[],
    setEvents:Dispatch<any>,
    setDetailComponent:Dispatch<any>
}> = ({data, events, setEvents, setDetailComponent}) => {
    const [algoritm, setAlgoritm] = useState<IAlgoritm>()
    const [selectedAlgoritmItem, setSelectedAlgoritmItem] = useState<AlgoritmItem>(algoritmItems[0]);

    return <>
        <div className={'header-block'}>
            <span>Сортировка</span>
            {/*<Badge label="Нет данных" size={'xs'} status="system" />*/}
        </div>
        <div className={'block-content'}>
            <Select items={algoritmItems}
                    label={'Выберите алгоритм сортировки'}
                    className={'mrg-v-m'}
                    value={selectedAlgoritmItem}
                    size={'s'}
                    onChange={({ value }) => setSelectedAlgoritmItem(value ?? algoritmItems[0])}
                    />
            <Button label={'Запустить сортировку'}
                    className={'mrg-v-m'}
                    size={'xs'}
                    form={'round'}
                    disabled={data === null || data.length === 0}
                    onClick={() => {
                        const localAlgoritm = getAlgoritmById(selectedAlgoritmItem?.id ?? 0, data)
                        const localEvents = localAlgoritm.do()

                        setAlgoritm(localAlgoritm)
                        setEvents(localEvents)
                        setDetailComponent(
                            <>
                                <div className={'block-s'}>
                                    <div className={'header-block-s'}>Исходные данные:</div>
                                    <div className={'block-content-s'}>{`[${AlgoritmEventHandler.getDataForSort(localEvents).join(', ')}]`}</div>
                                </div>
                                <div className={'block-s'}>
                                    <div className={'header-block-s'}>Результат сортировки:</div>
                                    <div className={'block-content-s'}>{`[${AlgoritmEventHandler.getResultSort(localEvents).join(', ')}]`}</div>
                                </div>
                            </>
                        )
                    }}
            />
            <Button label={`Показать результат`}
                    className={'mrg-v-m'}
                    onClick={() => setDetailComponent(
                        <>
                            <div className={'block-s'}>
                                <div className={'header-block-s'}>Исходные данные:</div>
                                <div className={'block-content-s'}>{`[${AlgoritmEventHandler.getDataForSort(events).join(', ')}]`}</div>
                            </div>
                            <div className={'block-s'}>
                                <div className={'header-block-s'}>Результат сортировки:</div>
                                <div className={'block-content-s'}>{`[${AlgoritmEventHandler.getResultSort(events).join(', ')}]`}</div>
                            </div>
                        </>
                    )}
                    disabled={events === null || events.length === 0}
                    form={'round'}
                    size={'xs'}
            />
        </div>
    </>
}