import React, {Dispatch, useEffect} from "react";
import {AlgoritmEvent} from "../AlgoritmEvent";
import {EventType} from "../EventType";
import {AlgoritmEventHandler} from "../AlgoritmEventHandler";
import {Table, TableColumn} from "@consta/uikit/Table";


export const LogListComponent:React.FC<{
    events:AlgoritmEvent[],
    selectedEventId:number,
    setSelectedEventId:Dispatch<any>
}> = ({events, selectedEventId, setSelectedEventId}) => {

    // region Список событий алгоритма выполнения сортировки
    const eventsTable = []
    eventsTable.push(
        <div key={-1} className={'event-table-row event-table-header'}>
            <span>Событие</span>
            <span>Время выполения</span>
            <span>Значение сибытия</span>
        </div>
    );

    if(events) {
        const firstDate = events[1]?.date; // Берем дату кроме INIT
        let prevDate = firstDate;
        eventsTable.push(events.map(event => {
            const selectedItemStyle = selectedEventId === event.id
                ? {
                    backgroundColor: 'var(--color-bg-link)',
                    color: 'white'
                }
                : {}

            const el = <div key={event.id}
                            className={'event-table-row'}
                            style={selectedItemStyle}
                            onClick={() => setSelectedEventId(event.id)}
            >
                <span>{EventType[event.eventType]}</span>
                <span>{Math.abs(event.date.getTime() - firstDate.getTime()) / 1000}ms (+{Math.abs(event.date.getTime() - prevDate.getTime()) / 1000}ms)</span>
                <span>{AlgoritmEventHandler.getValueString(event)}</span>
            </div>
            prevDate = event.date;
            return el;
        }));
    }
    // endregion

    return <>
        <div className={'header-block'}>
            <span>События сортировки</span>
            {/*<Badge label="Нет данных" size={'xs'} status="system" />*/}
        </div>
        <div className={'algoritm-component'}>
            <div className={'event-table'}>
                {eventsTable}
            </div>
        </div>
    </>
}