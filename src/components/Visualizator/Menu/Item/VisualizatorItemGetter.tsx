import {VisualisatorTypesItem} from "./VisualisatorTypesItem";
import {IVisualizatorItem} from "../../IVisualizatorItem";
import {BobbleVisualizatorItemListComponent} from "../../Copmonents/Custom/Bubble/BobbleVisualizatorItemListComponent";
import {ColumnVisualizatorItemListComponent} from "../../Copmonents/Custom/Column/ColumnVisualizatorItemListComponent";
import {LineVisualizatorComponent} from "../../Copmonents/Consta/Line/LineVisualizatorComponent";
import {ManyColorLineVisualizatorComponent} from "../../Copmonents/ApexCharts/ManyColorLineVisualizator/ManyColorLineVisualizatorComponent";

export const getVisualizatorItemListByVisualizatorType = (visualizatorType: VisualisatorTypesItem, visualizatorItems: IVisualizatorItem[]): JSX.Element => {
    switch (visualizatorType.id) {
        case 1:
            return <BobbleVisualizatorItemListComponent visualizatorItems={visualizatorItems}/>
            break;
        case 2:
            return <ColumnVisualizatorItemListComponent visualizatorItems={visualizatorItems}/>
            break;
        case 3:
            return <LineVisualizatorComponent visualizatorItems={visualizatorItems}/>
            break;
        case 4:
            return <ManyColorLineVisualizatorComponent visualizatorItems={visualizatorItems}/>
            break;
        default:
            console.error(`Не найден способ визуализации с заданным id (id:${visualizatorType.id})`);
            return <>Нет данных для визуализации</>
    }
}