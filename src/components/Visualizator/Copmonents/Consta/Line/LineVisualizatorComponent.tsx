import React from "react";
import {IVisualizatorItem} from "../../../IVisualizatorItem";
import {Line} from "@consta/charts/Line";


const convertVisualizatorItmesToLineData = (visualizatorItems:IVisualizatorItem[]) => {
    return visualizatorItems.map(item => ({
        curPosition: item.curPosition,
        value: item.value,
    }))
}

export const LineVisualizatorComponent:React.FC<{visualizatorItems:IVisualizatorItem[]}> = ({visualizatorItems}) => {
    return <Line className={'column-visualizator-item-list'}
                 data={convertVisualizatorItmesToLineData(visualizatorItems)}
                 smooth={true}
                 xField="curPosition"
                 yField="value"
    />
}