import React, {Dispatch} from "react";
import {AlgoritmEvent} from "../AlgoritmEvent";
import {AlgoritmEventHandler} from "../AlgoritmEventHandler";
import {EventMoveIdsType} from "./EventMoveIdsType";
import {EventType} from "../EventType";
import {Badge} from "@consta/uikit/Badge";


const getDetailForEvent = (event:AlgoritmEvent):JSX.Element => {
    return <>
        <div className={'block-s'}>
            <div className={'header-block-s'}>Событие алгоритма №{event.id} (id:{event.id}):</div>
            <div className={'block-content-s'}>
                <div>{AlgoritmEventHandler.getEventDataString(event)}</div>
            </div>
        </div>
    </>
}

export const LogListComponent:React.FC<{
    events:AlgoritmEvent[],
    eventMoveIds:EventMoveIdsType,
    setEventMoveIds:Dispatch<any>,
    setDetailComponent:Dispatch<any>
}> = ({events, eventMoveIds, setEventMoveIds, setDetailComponent}) => {

    // region Список событий алгоритма выполнения сортировки
    const eventsTable = []
    eventsTable.push(
        <div key={-1} className={'event-table-row event-table-header'}>
            <span>id</span>
            <span>Событие</span>
        </div>
    );

    if(events) {
        eventsTable.push(events.map(event => {
            if(event.eventType === EventType.START
            || event.eventType === EventType.FINISH
            || event.eventType === EventType.SWAP) {
                const selectedItemStyle = eventMoveIds.selectedEventId === event.id
                    ? {
                        backgroundColor: 'var(--color-bg-link)',
                        color: 'white'
                    }
                    : {}

                const el = <div key={event.id}
                                className={'event-table-row'}
                                style={selectedItemStyle}
                                onClick={() => {
                                    setEventMoveIds({selectedEventId: event.id, prevEventId: eventMoveIds.selectedEventId})
                                    setDetailComponent(getDetailForEvent(event))
                                }}
                >
                    <span>{event.id}</span>
                    <span>{AlgoritmEventHandler.getEventDataString(event)}</span>
                </div>
                return el;
            }
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