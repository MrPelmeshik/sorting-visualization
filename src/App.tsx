import React, {useEffect, useState} from 'react';
import './App.css';
import {VisualizatorComponent} from "./components/Visualizator/VisualizatorComponent";
import {AlgoritmsComponent} from "./components/Algoritms/AlgoritmsComponent";
import {Layout} from "@consta/uikit/Layout";
import {presetGpnDefault, Theme} from "@consta/uikit/Theme";
import {Badge} from "@consta/uikit/Badge";
import {DataGeneratorComponent} from "./components/DataGenerator/DataGeneratorComponent";
import {AlgoritmEvent} from "./components/Algoritms/AlgoritmEvent";
import {LogListComponent} from "./components/Algoritms/LogList/LogListComponent";
import {IVisualizatorItem} from "./components/Visualizator/IVisualizatorItem";
import {
  VisualisatorTypesItem, visualisatorTypesItems,
  VisualizatorMenuComponent
} from "./components/Visualizator/Menu/VisualizatorMenuComponent";
import {DetailComponent} from "./components/Details/DetailComponent";


export const App = () => {
  const [data, setData] = useState<number[]>([]);
  const [visualizatorItems, setVisualizatorItems] = useState<IVisualizatorItem[]>([]);
  const [events, setEvents] = useState<AlgoritmEvent[]>([]);
  const [visualizatorType, setVisualizatorType] = useState<VisualisatorTypesItem>(visualisatorTypesItems[0]);
  const [selectedEventId, setSelectedEventId] = useState<number>(1);
  const [detailComponent, setDetailComponent] = useState<JSX.Element>(<>Нет данных для детализации</>);

  useEffect(() => {
    setEvents([])
    setVisualizatorItems([])
  }, [data]) // При генерации новых данных будет производиться очистка событий алгоритма и визуализации

  return <>
    <Theme preset={presetGpnDefault}>
      <Layout direction={'column'}>
        <Layout>
          <Layout flex={2} direction={'column'}>
            <Layout direction={'column'} className={'block'}>
              <DataGeneratorComponent data={data} setData={setData} setDetailComponent={setDetailComponent} />
            </Layout>
            <Layout direction={'column'} className={'block'}>
              <AlgoritmsComponent data={data} events={events} setEvents={setEvents} setDetailComponent={setDetailComponent} />
            </Layout>
            <Layout direction={'column'} className={'block'}>
              <VisualizatorMenuComponent visualizatorType={visualizatorType} setVisualizatorType={setVisualizatorType} />
            </Layout>
          </Layout>
          <Layout flex={2} direction={'column'} className={'block'}>
            <LogListComponent events={events} selectedEventId={selectedEventId} setSelectedEventId={setSelectedEventId} />
          </Layout>
          <Layout flex={6} direction={'column'} className={'block'}>
            <DetailComponent detailComponent={detailComponent} />
          </Layout>
        </Layout>
        <Layout direction={'column'} className={'block'}>
          <VisualizatorComponent events={events} selectedEventId={selectedEventId} visualizatorType={visualizatorType} visualizatorItems={visualizatorItems} setVisualizatorItems={setVisualizatorItems} />
        </Layout>
      </Layout>
    </Theme>
  </>
}
