import "./ColumnVisualizatorItemListComponent.css"
import React, {useState} from "react";
import {defaultItemColor, getColorRgbStyle} from "../../Color/Color";
import {IVisualizatorItem} from "../IVisualizatorItem";
import {Tooltip} from "@consta/uikit/Tooltip";
import {Position} from "@consta/uikit/Popover";
import {ColumnVisualizatorItemComponent} from "./Item/ColumnVisualizatorItemComponent";


export const ColumnVisualizatorItemListComponent:React.FC<{visualizatorItems:IVisualizatorItem[]}> = ({visualizatorItems}) => {
    const visualizatorItemList = visualizatorItems.map(item => <ColumnVisualizatorItemComponent key={item.id} item={item} />)

    return <div className={'column-visualizator-item-list'}>
        {visualizatorItemList}
    </div>
}