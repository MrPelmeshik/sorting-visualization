import React, {useEffect} from "react";
import {AlgoritmEvent} from "../AlgoritmEvent";
import {EventType} from "../EventType";
import {AlgoritmEventHandler} from "../AlgoritmEventHandler";
import {Table, TableColumn} from "@consta/uikit/Table";

export const LogListComponent:React.FC<{events:AlgoritmEvent[]}> = ({events}) => {

    // const columns: TableColumn<typeof events[number]>[] = [
    //     {
    //         title: 'id',
    //         accessor: 'id',
    //         align: 'center',
    //         sortable: true,
    //     },
    //     {
    //         title: 'Событие',
    //         accessor: 'eventType',
    //         align: 'center',
    //         sortable: true,
    //     },
    //     {
    //         title: 'Время выполения',
    //         accessor: 'date',
    //         sortable: true,
    //     },
    //     {
    //         title: 'Значение сибытия',
    //         accessor: 'value',
    //         sortable: true,
    //     },
    // ];

    // region Список логов выполнения сортировки
    const eventsTable = []
    eventsTable.push(
        <div className={'event-table-row event-table-header'}>
            <span>Событие</span>
            <span>Время выполения</span>
            <span>Значение сибытия</span>
        </div>
    );

    if(events) {
        const firstDate = events[1]?.date; // Берем дату кроме INIT
        let prevDate = firstDate;
        eventsTable.push(events.map(event => {
            const el = <div className={'event-table-row'}>
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
        {/*<Table rows={events} columns={columns} />;*/}
        <div className={'algoritm-component'}>
            <div className={'event-table'}>
                {eventsTable}
            </div>
        </div>
    </>
}