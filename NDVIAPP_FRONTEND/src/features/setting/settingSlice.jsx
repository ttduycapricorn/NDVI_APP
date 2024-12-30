// redux/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { BarChart, PieChart, SankeyChart } from '../../components/charts/';

const initialState = {
    mapType: 'openStreetMap',
    chartType: 'sankeyChart',
    isShowChartTab: false,
    isSidebarOpen: true,
    mapTypeList: {
        openStreetMap: {
            title: 'openStreetMap',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            image: 'images/mapStyles/openStreetMap.png',
        },
        esriWorldImagery: {
            title: 'Esri World Imagery',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            image: 'images/mapStyles/esriWorldImagery.jpeg',
        },
        esriWorldStreetMap: {
            title: 'Esri World Street Map',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            image: '/images/mapStyles/esriWorldStreetMap.jpeg',
        },
        cartoDB: {
            title: 'CartoDB',
            url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
            image: '/images/mapStyles/cartoDB.png',
        },
        cartoDBDarkMatter: {
            title: 'CartoDB Dark Matter',
            url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            image: '/images/mapStyles/cartoDBDarkMatter.png',
        },
    },
    chartTypeList: {
        barChart: {
            title: 'Bar chart',
            image: '/images/chartStyles/barChart.png',
            element: BarChart,
        },
        pieChart: {
            title: 'Pie chart',
            image: '/images/chartStyles/pieChart.png',
            element: PieChart,
        },
        sankeyChart: {
            title: 'Sankey chart',
            image: '/images/chartStyles/sankeyChart.png',
            element: SankeyChart,
        },
    },
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setChartType: (state, action) => {
            state.chartType = action.payload;
        },
        setMapType: (state, action) => {
            state.mapType = action.payload;
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        toggleChartTab: (state) => {
            state.isShowChartTab = !state.isShowChartTab;
        },
    },
});

// Selectors
export const selectChartType = (state) => state.settings.chartType;
export const selectMapType = (state) => state.settings.mapType;
export const selectMapTypeList = (state) => state.settings.mapTypeList;
export const selectSidebarStatus = (state) => state.settings.isSidebarOpen;
export const selectCurrentChart = (state) => state.settings.chartTypeList[state.settings.chartType];
export const selectChartTypeList = (state) => state.settings.chartTypeList;
export const selectChartTabStatus = (state) => state.settings.isShowChartTab;

export const { setChartType, setMapType, toggleSidebar, toggleChartTab } = settingsSlice.actions;
export default settingsSlice.reducer;
