import "./BobbleVisualizatorItemListComponent.css"
import React, {useState} from "react";
import {defaultItemColor, getColorRgbStyle} from "../../../../Color/Color";
import {IVisualizatorItem} from "../../../IVisualizatorItem";
import {Tooltip} from "@consta/uikit/Tooltip";
import {Position} from "@consta/uikit/Popover";
import {BobbleVisualizatorItemComponent} from "./Item/BobbleVisualizatorItemComponent";


export const BobbleVisualizatorItemListComponent:React.FC<{visualizatorItems:IVisualizatorItem[]}> = ({visualizatorItems}) => {
    const visualizatorItemList = visualizatorItems.map(item => <BobbleVisualizatorItemComponent key={item.id} item={item} />)

    return <div className={'bobble-visualizator-item-list'}>
        {visualizatorItemList}
    </div>
}