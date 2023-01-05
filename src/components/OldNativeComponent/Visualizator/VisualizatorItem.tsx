import "./VisualisatorItem.css"
import React from "react";
import {defaultItemColor, getColorRgbStyle} from "../ColorComponent/Color";
import {IVisualizatorItem} from "./IVisualizatorItem";


export const VisualizatorItem:React.FC<{item:IVisualizatorItem}> = ({item}) => {

    const style = {
        width:`calc(2em * ${item.scale ?? 1})`,
        height:`calc(2em * ${item.scale ?? 1})`,
        backgroundColor:getColorRgbStyle(item.color ?? defaultItemColor),
        boxShadow: item.validPosition.includes(item.curPosition)
            ? '0 0 10px chartreuse, 0 0 20px lawngreen'
            : ''
    }

    const title = `id:${item.id}\n` +
        `value:${item.value}\n` +
        `curPosition:${item.curPosition}\n` +
        `validPosition:${item.validPosition}\n` +
        `scale?:${item.scale}\n`;

    return <div className={'visualizator-item'}
                style={style}
                title={title}>
        {item.value}
    </div>
}