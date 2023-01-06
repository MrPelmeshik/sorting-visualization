import {IVisualizatorItem} from "./Visualizator/IVisualizatorItem";
import {defaultItemColor, getShiftColor} from "./Color/Color";
import {getRandomInt} from "./ServiceFunc";


export const getRandomData = (n:number):number[] => {
    let data:number[] = [];
    for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random()*100))
    }
    return data
}

const generateDefaultVisualizatorState = (n:number):IVisualizatorItem[] => {
    let curColor = defaultItemColor;
    let visualizatorItems:IVisualizatorItem[] = [];
    for (let i = 1; i < n+1; i++) {
        curColor = getShiftColor(n, curColor);

        visualizatorItems.push({
            id: i,
            value: i,
            curPosition: i - 1,
            validPosition: [i - 1],
            scale: 1 + (1/n)*i,
            color: curColor
        });
    }
    return visualizatorItems;
}

export const defaultVisualizatorState:IVisualizatorItem[] = generateDefaultVisualizatorState(8);

export const swapper = (count:number, data:IVisualizatorItem[]):IVisualizatorItem[] => {
    let newData = data.slice();
    console.group(`Change position items (lenght:${data.length}, count iteration:${count})`)
    for (let i = 0; i < count; i++) {
        const a = getRandomInt(0, newData.length - 1);
        const b = getRandomInt(0, newData.length - 1);
        console.log(`swap(${a},${b})`);
        [newData[a], newData[b]] = [newData[b], newData[a]];
        newData[a].curPosition = a;
        newData[b].curPosition = b;
    }
    console.groupEnd();
    return newData;
}