import React, {useEffect, useState} from 'react';
import './App.css';
import {VisualizatorComponent} from "./components/OldNativeComponent/Visualizator/VisualizatorComponent";
import {AlgoritmsComponent} from "./components/Algoritms/AlgoritmsComponent";
import {Layout} from "@consta/uikit/Layout";
import {presetGpnDefault, Theme} from "@consta/uikit/Theme";
import {Badge} from "@consta/uikit/Badge";
import {DataGeneratorComponent} from "./components/DataGenerator/DataGeneratorComponent";
import {AlgoritmEvent} from "./components/Algoritms/AlgoritmEvent";
import {LogListComponent} from "./components/Algoritms/LogList/LogListComponent";


export const App = () => {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState<AlgoritmEvent[]>([]);
  const [detailComponent, setDetailComponent] = useState<JSX.Element>(<>Нет данных для детализации</>);

  useEffect(() => {
    setEvents([])
  }, [data])

  return <>
    <Theme preset={presetGpnDefault}>
      <Layout direction={'column'}>
        <Layout>
          <Layout flex={2} direction={'column'}>
            <Layout direction={'column'} className={'block'}>
              <div className={'header-block'}>
                <p>Генерация данных</p>
                {/*<Badge label="Не выполнялось" size={'xs'} status="system" />*/}
              </div>
              <DataGeneratorComponent data={data} setData={setData} setDetailComponent={setDetailComponent} />
            </Layout>
            <Layout direction={'column'} className={'block'}>
              <div className={'header-block'}>
                <p>Сортировка</p>
                {/*<Badge label="Нет данных" size={'xs'} status="system" />*/}
              </div>
              <AlgoritmsComponent data={data} events={events} setEvents={setEvents} setDetailComponent={setDetailComponent} />
            </Layout>
            <Layout direction={'column'} className={'block'}>
              <div className={'header-block'}>
                <p>Визуализация</p>
                {/*<Badge label="Нет данных" size={'xs'} status="system" />*/}
              </div>
              <div className={'block-content'}>
                any content
              </div>
            </Layout>
          </Layout>
          <Layout flex={2} direction={'column'} className={'block'}>
            <div className={'header-block'}>
              <p>События сортировки</p>
              {/*<Badge label="Нет данных" size={'xs'} status="system" />*/}
            </div>
            <LogListComponent events={events} />
          </Layout>
          <Layout flex={6} direction={'column'} className={'block'}>
            <div className={'header-block'}>
              <p>Детализация</p>
            </div>
            <div className={'block-content'}>
              {detailComponent}
            </div>
          </Layout>
        </Layout>
        <Layout direction={'column'} className={'block'}>
          <div className={'header-block'}>
            <p>Визуализация</p>
          </div>
          <div className={'block-content'}>
            {/*<VisualizatorComponent visualizatorItemsData={data}/>*/}
          </div>
        </Layout>
      </Layout>
    </Theme>
  </>
}
