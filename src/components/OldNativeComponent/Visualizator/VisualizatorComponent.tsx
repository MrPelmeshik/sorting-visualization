import "./Visualizator.css"
import {VisualizatorItem} from "./VisualizatorItem";
import {IVisualizatorItem} from "./IVisualizatorItem";
import React from "react";


export const VisualizatorComponent:React.FC<{visualizatorItemsData:IVisualizatorItem[]}> = ({visualizatorItemsData}) => {
    const visualizatorItems = visualizatorItemsData.map(item => <VisualizatorItem key={item.id} item={item}/>)

    return <div className={'visualizator'}>
        {visualizatorItems}
    </div>
}