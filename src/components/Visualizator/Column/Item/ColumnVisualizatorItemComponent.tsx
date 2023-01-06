import {defaultItemColor, getColorRgbStyle} from "../../../Color/Color";
import {Tooltip} from "@consta/uikit/Tooltip";
import React, {useState} from "react";
import {Position} from "@consta/uikit/Popover";
import {IVisualizatorItem} from "../../IVisualizatorItem";
import './ColumnVisualizatorItemComponent.css'


export const ColumnVisualizatorItemComponent:React.FC<{item:IVisualizatorItem}> = ({item}) => {
    const [position, setPosition] = useState<Position>(undefined);

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
    };

    const style = {
        width:`calc(100%)`,
        height:`calc(2em * ${item.scale ?? 1})`,
        backgroundColor:getColorRgbStyle(item.color ?? defaultItemColor),
        boxShadow: item.validPosition.includes(item.curPosition)
            ? 'inset 0 0 10px chartreuse, inset 0 0 20px lawngreen'
            : ''
    }

    return <>
        <div className={'column-visualizator-item'}
             style={style}
             onMouseMove={handleMouseMove}
             onMouseLeave={() => setPosition(undefined)}
        >
            {item.value}
        </div>
        <Tooltip
            direction="upCenter"
            spareDirection="downStartLeft"
            size={'s'}
            position={position}
            isInteractive={false}
            className={'title'}
        >
            <div>id: {item.id}</div>
            <div>value: {item.value}</div>
            <div>curPosition: {item.curPosition}</div>
            <div>validPosition: [{item.validPosition.join(', ')}]</div>
            <div>scale: {item.scale?.toFixed(2)}</div>
        </Tooltip>
    </>
}