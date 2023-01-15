import "./Visualizator.css"
import {IVisualizatorItem} from "./IVisualizatorItem";
import React, {Dispatch, useEffect, useState} from "react";
import {AlgoritmEventHandler} from "../Algoritms/AlgoritmEventHandler";
import {defaultItemColor, getShiftColor} from "../Color/Color";
import {AlgoritmEvent} from "../Algoritms/AlgoritmEvent";
import {EventType} from "../Algoritms/EventType";
import {EventMoveIdsType} from "../Algoritms/LogList/EventMoveIdsType";
import {VisualisatorTypesItem} from "./Menu/Item/VisualisatorTypesItem";
import {getVisualizatorItemListByVisualizatorType} from "./Menu/Item/VisualizatorItemGetter";


const doEvent = (visualizatorItems:IVisualizatorItem[], events: AlgoritmEvent[], doEventId:number) => {
    visualizatorItems.forEach(item => item.isSelected = false);
    switch (events[doEventId].eventType) {
        case EventType.INIT:
            break;
        case EventType.START:
            break;
        case EventType.CHECK:
            break;
        case EventType.SWAP:
            const indexesForSwap = AlgoritmEventHandler.getIndexesForSwap(events[doEventId])

            const t = visualizatorItems[indexesForSwap[0]]
            visualizatorItems[indexesForSwap[0]] = visualizatorItems[indexesForSwap[1]]
            visualizatorItems[indexesForSwap[1]] = t

            visualizatorItems[indexesForSwap[0]].curPosition = indexesForSwap[0];
            visualizatorItems[indexesForSwap[1]].curPosition = indexesForSwap[1];
            break;
        case EventType.FINISH:
            break;
        case EventType.CREATE_POINTER:
            break;
        case EventType.DELETE_POINTER:
            break;
        case EventType.SHIFT_POINTER:
            break;
        default:
            console.error(`Неизвестный тип события алгоритма ${EventType[events[doEventId].eventType]}`)
    }
}

const getContentJsx = (visualizatorItems:IVisualizatorItem[], visualizatorType:VisualisatorTypesItem):JSX.Element => {
    return visualizatorItems && visualizatorItems.length > 0
        ? getVisualizatorItemListByVisualizatorType(visualizatorType, visualizatorItems)
        : <>Нет данных для визуализации</>
}

export const VisualizatorComponent:React.FC<{
    events: AlgoritmEvent[],
    eventMoveIds:EventMoveIdsType,
    setEventMoveIds:Dispatch<any>,
    visualizatorType:VisualisatorTypesItem,
    visualizatorItems:IVisualizatorItem[],
    setVisualizatorItems:Dispatch<any>
}> = ({events, eventMoveIds, setEventMoveIds, visualizatorType, visualizatorItems, setVisualizatorItems}) => {
    const [visualizatorContent, setVisualizatorContent] = useState<JSX.Element>(getContentJsx(visualizatorItems, visualizatorType))

    useEffect(() => {
        const initValues = AlgoritmEventHandler.getDataForSort(events)
        const finalValues = AlgoritmEventHandler.getResultSort(events)

        if(initValues && finalValues && initValues.length !== finalValues.length)
            console.warn(`Количетсво значений в исходном и отсортированном массивах не совпадают или отсутствуют (${initValues.length} : ${finalValues.length})`);
        else {
            // const maxValue = finalValues[finalValues.length - 1]
            // const minValue = finalValues[0]

            const getValidPosition = (n:number, data:number[]):number[] => {
                let validPosition: number[] = []

                for (let j = 0; j < data.length; j++) {
                    if (n === data[j])
                        validPosition.push(j)
                }

                return validPosition
            }

            let curColor = defaultItemColor
            let items:IVisualizatorItem[] = []
            for (let i = 0; i < finalValues.length; i++) {
                curColor = getShiftColor(finalValues.length, curColor)
                items.push({
                    id: i,
                    value: finalValues[i],
                    curPosition: i,
                    validPosition: getValidPosition(finalValues[i], finalValues),
                    isSelected: false,
                    scale: 1 + i/finalValues.length,
                    color: curColor
                })
            }
            setVisualizatorItems(items)
            setEventMoveIds({selectedEventId:events.length - 1, prevEventId:null})
        }
    }, [events])

    useEffect(() => setVisualizatorContent(getContentJsx(visualizatorItems, visualizatorType)), [visualizatorType])

    useEffect(() => {
        if(eventMoveIds.prevEventId) {
            // region move forward
            if(eventMoveIds.selectedEventId > eventMoveIds.prevEventId) {
                let targetEventId = eventMoveIds.selectedEventId;
                let curEventId = eventMoveIds.prevEventId;
                while(targetEventId > curEventId){
                    doEvent(visualizatorItems, events, curEventId)
                    curEventId++;
                }
            }
            // endregion
            // region move back
            if(eventMoveIds.selectedEventId < eventMoveIds.prevEventId) {
                let targetEventId = eventMoveIds.selectedEventId;
                let curEventId = eventMoveIds.prevEventId;
                while(targetEventId < curEventId){
                    doEvent(visualizatorItems, events, curEventId - 1)
                    curEventId--;
                }
            }
            // endregion
            // region set selected item
            const indexNextSwap = AlgoritmEventHandler.getIndexesInEvent(events[eventMoveIds.selectedEventId]);
            indexNextSwap.forEach(index => {
                visualizatorItems[index].isSelected = true;
            })
            // endregion
        }

        /// Тут что-то не так
        //AlgoritmEventHandler.getIndexForEvent(events[eventMoveIds.selectedEventId])?.forEach(id => visualizatorItems[id].isSelected = true)

        setVisualizatorContent(getContentJsx(visualizatorItems, visualizatorType))
    }, [eventMoveIds])

    return <>
        <div className={'header-block'}>
            <span>Визуализация (event.id: {eventMoveIds.selectedEventId ?? 'некорректный'})</span>
        </div>
        <div className={'block-content visualizator'}>
            {visualizatorContent}
        </div>
    </>
}