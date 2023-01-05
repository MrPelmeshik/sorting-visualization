import {IRgbColor} from "./IRgbColor";


export const defaultItemColor: IRgbColor = {
    red: 30,
    green: 0,
    blue: 240
}

export const getColorRgbStyle = (color:IRgbColor):string =>
    `rgb(${color.red},${color.green},${color.blue})`;

export const getShiftColor = (color:IRgbColor, countElement:number):IRgbColor => ({
    red: color.red,
    green: color.green  + (255 - defaultItemColor.green) / countElement,
    blue: color.blue
})