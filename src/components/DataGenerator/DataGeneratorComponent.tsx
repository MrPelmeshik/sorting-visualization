import React, {Dispatch, useState} from "react";
import {Button} from "@consta/uikit/Button";
import {getRandomData} from "../TestFunc";
import {Slider} from "@consta/uikit/Slider";

export const DataGeneratorComponent:React.FC<{
    data:number[],
    setData:Dispatch<any>,
    setDetailComponent:Dispatch<any>
}> = ({data, setData, setDetailComponent}) => {
    const [countData, setCountData] = useState<number>(20)

    const getValue = (value: number | [number, number]):number => {
        if(typeof value === 'number')
            return value

        if(Array.isArray(value))
            return value[1]

        return 0
    }

    return <>
        <div className={'header-block'}>
            <span>Генерация данных</span>
            {/*<Badge label="Не выполнялось" size={'xs'} status="system" />*/}
        </div>
        <div className={'block-content'}>
            <Slider label={`Количество значений:`}
                    className={'mrg-v-m'}
                    size={'s'}
                    leftSide={'input'}
                    onChange={({ value }) => setCountData(getValue(value))}
                    value={countData}
            />
            <Button label={`Сгенерировать данные`}
                    className={'mrg-v-m'}
                    onClick={() => {
                        const localData = getRandomData(countData)
                        setData(localData)
                        setDetailComponent(
                            <>
                                <div className={'block-s'}>
                                    <div className={'header-block-s'}>Сгенерированные данные:</div>
                                    <div className={'block-content-s'}>[{localData.join(', ')}]</div>
                                </div>
                            </>
                        )
                    }}
                    form={'round'}
                    size={'xs'}
            />
            <Button label={`Показать данные`}
                    className={'mrg-v-m'}
                    onClick={() => {
                        setDetailComponent(
                            <>
                                <div className={'block-s'}>
                                    <div className={'header-block-s'}>Сгенерированные данные:</div>
                                    <div className={'block-content-s'}>[{data.join(', ')}]</div>
                                </div>
                            </>
                        )}}
                    disabled={data === null || data.length === 0}
                    form={'round'}
                    size={'xs'}
            />
        </div>
    </>
}