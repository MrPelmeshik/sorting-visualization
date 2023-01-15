import React, {Dispatch} from "react";
import {Select} from "@consta/uikit/Select";
import {Switch} from "@consta/uikit/Switch";
import {VisualisatorTypesItem} from "./Item/VisualisatorTypesItem";
import {visualisatorTypesItems} from "./Item/VisualisatorTypesItems";


export const VisualizatorMenuComponent:React.FC<{
    visualizatorType:VisualisatorTypesItem,
    setVisualizatorType:Dispatch<VisualisatorTypesItem>
}> = ({visualizatorType, setVisualizatorType}) => {
    return <>
        <div className={'header-block'}>
            <span>Управление визуализацией</span>
            {/*<Badge label="Нет данных" size={'xs'} status="system" />*/}
        </div>
        <div className={'block-content'}>
            <Select items={visualisatorTypesItems}
                    label={'Выберите вариант визуализации:'}
                    className={'mrg-m'}
                    value={visualizatorType ?? visualisatorTypesItems[0]}
                    size={'s'}
                    onChange={({ value }) => setVisualizatorType(value ?? visualisatorTypesItems[0])}
            />
            <Switch label={'Нормализовать значения'}
                    checked={false}
                    disabled={true}
                    className={'mrg-m'}
                    size={'s'}
            />
            <Switch label={'Исключить \'некоторые\' события'}
                    checked={true}
                    disabled={true}
                    className={'mrg-m'}
                    size={'s'}
            />
            <Switch label={'Показать время выполения событий'}
                    checked={false}
                    disabled={true}
                    className={'mrg-m'}
                    size={'s'}
            />
        </div>
    </>
}