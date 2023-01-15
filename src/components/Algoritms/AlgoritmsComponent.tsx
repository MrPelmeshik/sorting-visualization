import React, {Dispatch, useState} from "react";
import {AlgoritmEvent} from "./AlgoritmEvent";
import {AlgoritmEventHandler} from "./AlgoritmEventHandler";
import './Algoritm.css'
import {Button} from "@consta/uikit/Button";
import {Select} from "@consta/uikit/Select";
import {AlgoritmItem} from "./Item/AlgoritmItem";
import {algoritmItems} from "./Item/AlgoritmItems";
import {getAlgoritmById} from "./Item/AlgoritmItemGetter";


export const AlgoritmsComponent:React.FC<{
    data:number[],
    events:AlgoritmEvent[],
    setEvents:Dispatch<any>,
    setDetailComponent:Dispatch<any>
}> = ({data, events, setEvents, setDetailComponent}) => {
    const [selectedAlgoritmItem, setSelectedAlgoritmItem] = useState<AlgoritmItem>(algoritmItems[0]);

    return <>
        <div className={'header-block'}>
            <span>Управление сортировкой</span>
            {/*<Badge label="Нет данных" size={'xs'} status="system" />*/}
        </div>
        <div className={'block-content'}>
            <Select items={algoritmItems}
                    label={'Выберите алгоритм сортировки'}
                    className={'mrg-m'}
                    value={selectedAlgoritmItem}
                    size={'s'}
                    onChange={({ value }) => setSelectedAlgoritmItem(value ?? algoritmItems[0])}
                    />
            <Button label={'Запустить сортировку'}
                    className={'mrg-m'}
                    size={'xs'}
                    form={'round'}
                    disabled={data === null || data.length === 0}
                    onClick={() => {
                        const localAlgoritm = getAlgoritmById(selectedAlgoritmItem?.id ?? 0, data)
                        if(localAlgoritm) {
                            const localEvents = localAlgoritm.do()

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
                        }}}
            />
            <Button label={`Показать результат`}
                    className={'mrg-m'}
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