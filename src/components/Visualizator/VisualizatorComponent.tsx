import "./Visualizator.css"
import {BobbleVisualizatorItemListComponent} from "./Bubble/BobbleVisualizatorItemListComponent";
import {IVisualizatorItem} from "./IVisualizatorItem";
import React, {Dispatch, useEffect} from "react";
import {VisualisatorTypesItem} from "./Menu/VisualizatorMenuComponent";
import {ColumnVisualizatorItemListComponent} from "./Column/ColumnVisualizatorItemListComponent";
import {AlgoritmEventHandler} from "../Algoritms/AlgoritmEventHandler";
import {defaultItemColor, getShiftColor} from "../Color/Color";
import {AlgoritmEvent} from "../Algoritms/AlgoritmEvent";


const getVisualizatorItemListByVisualizatorType = (visualizatorType:VisualisatorTypesItem, visualizatorItems:IVisualizatorItem[]) => {
    switch (visualizatorType.id) {
        case 1:
            return <BobbleVisualizatorItemListComponent visualizatorItems={visualizatorItems} />
            break;
        case 2:
            return <ColumnVisualizatorItemListComponent visualizatorItems={visualizatorItems} />
            break;
        default:
            throw new Error(`Не найден способ визуализации с заданным id (id:${visualizatorType.id})`);
    }
}

export const VisualizatorComponent:React.FC<{
    events: AlgoritmEvent[],
    selectedEventId:number,
    visualizatorType:VisualisatorTypesItem,
    visualizatorItems:IVisualizatorItem[],
    setVisualizatorItems:Dispatch<any>
}> = ({events, selectedEventId, visualizatorType, visualizatorItems, setVisualizatorItems}) => {
    useEffect(() => {
        let initValues = AlgoritmEventHandler.getDataForSort(events)
        let finalValues = AlgoritmEventHandler.getResultSort(events)

        if(initValues.length !== finalValues.length)
            console.warn(`Количетсво значений в исходном и отсортированном массивах не совпадают (${initValues.length} : ${finalValues.length})`);

        const getValidPosition = (n:number, data:number[]):number[] => {
            let validPosition: number[] = []

            for (let j = 0; j < n; j++) {
                if (n === data[j])
                    validPosition.push(j)
            }

            return validPosition
        }

        let curColor = defaultItemColor
        let items:IVisualizatorItem[] = []
        for (let i = 0; i < initValues.length; i++) {
            curColor = getShiftColor(initValues.length, curColor)
            items.push({
                id: i,
                value: initValues[i],
                curPosition: i,
                validPosition: getValidPosition(initValues[i], finalValues),
                scale: 1 + i/initValues.length,
                // color: curColor
            })
        }
        setVisualizatorItems(items)
    }, [events]) // При изменении событий алгоритма будет происходить пересчет элементов визуализатора

    let content

    if(visualizatorItems && visualizatorItems.length > 0)
        content = getVisualizatorItemListByVisualizatorType(visualizatorType, visualizatorItems)
    else
        content = <>Нет данных для визуализации</>

    return <>
        <div className={'header-block'}>
            <span>Визуализация</span>
        </div>
        <div className={'block-content visualizator'}>
            {content}
        </div>
    </>
}