import {IAlgoritm} from "../IAlgoritm";
import {BobleSortAlgoritm} from "../SortAlgoritms/BobleSortAlgoritm";

export const getAlgoritmById = (id: number, data: number[]): IAlgoritm | null => {
    switch (id) {
        case 1:
            return new BobleSortAlgoritm(data)
            break;
        default:
            console.error(`Не найден алгоритм с заданным id (id:${id})`);
    }
    return null;
}