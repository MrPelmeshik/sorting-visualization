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

    return <div className={'block-content'}>
        <Slider label={`Количество значений ${countData}`}
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
                            <p>Сгенерированные данные:</p>
                            <p>[{localData.join(', ')}]</p>
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
                            <p>Сгенерированные данные:</p>
                            <p>[{data.join(', ')}]</p>
                        </>
                    )}}
                disabled={data === null || data.length === 0}
                form={'round'}
                size={'xs'}
        />
    </div>
}