import {IRgbColor} from "../ColorComponent/IRgbColor";

export interface IVisualizatorItem {
    id: number
    value: number
    curPosition: number
    validPosition: number[]
    scale?: number
    color?: IRgbColor
}