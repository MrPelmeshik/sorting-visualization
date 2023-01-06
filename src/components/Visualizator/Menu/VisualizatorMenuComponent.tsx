import React, {Dispatch} from "react";
import {Select} from "@consta/uikit/Select";


export type VisualisatorTypesItem = {
    id: number
    label: string
};

export const visualisatorTypesItems: VisualisatorTypesItem[] = [
    {
        id: 1,
        label: 'Круги'
    },
    {
        id: 2,
        label: 'Столбцы'
    }
];

export const VisualizatorMenuComponent:React.FC<{
    visualizatorType:VisualisatorTypesItem,
    setVisualizatorType:Dispatch<VisualisatorTypesItem>
}> = ({visualizatorType, setVisualizatorType}) => {
    return <>
        <div className={'header-block'}>
            <span>Меню визуализации</span>
            {/*<Badge label="Нет данных" size={'xs'} status="system" />*/}
        </div>
        <div className={'block-content'}>
            <Select items={visualisatorTypesItems}
                    label={'Выберите вариант визуализации:'}
                    className={'mrg-v-m'}
                    value={visualizatorType ?? visualisatorTypesItems[0]}
                    size={'s'}
                    onChange={({ value }) => setVisualizatorType(value ?? visualisatorTypesItems[0])}
            />
        </div>
    </>
}