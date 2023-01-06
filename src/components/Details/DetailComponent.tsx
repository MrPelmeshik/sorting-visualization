import React from "react";

export const DetailComponent:React.FC<{detailComponent:JSX.Element}> = ({detailComponent}) => {
    return <>
        <div className={'header-block'}>
            <span>Детализация</span>
        </div>
        <div className={'block-content'}>
            {detailComponent}
        </div>
    </>
}