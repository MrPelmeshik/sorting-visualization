import {IRgbColor} from "../Color/IRgbColor";

export interface IVisualizatorItem {
    id: number
    value: number
    curPosition: number
    validPosition: number[]
    isSelected: boolean
    scale?: number
    color?: IRgbColor
}