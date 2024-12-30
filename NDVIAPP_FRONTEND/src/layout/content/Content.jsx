import { useSelector } from 'react-redux';
import { HeaderComponent, MapShapeFile } from '../../components';
import InputPrediction from '../../components/inputPrediction/InputPredictionComponent.jsx';
import LayerSelector from '../../components/LayerSelector/LayerSelector.jsx';
import { selectSidebarStatus } from '../../features/setting/settingSlice.jsx';
import ChartTab from '../../components/charts/ChartTab.jsx';
import DataPrepairation from '../../components/dataPrepairation/DataPrepairation.jsx';
import { selectIsShowpredictionSteps } from '../../features/predictionSteps/predictionStepsSlice.jsx';

function Content() {
    const { compareLayer } = useSelector((state) => state.layer);
    const isSidebarOpen = useSelector(selectSidebarStatus);
    const isShowPredictionSteps = useSelector(selectIsShowpredictionSteps);

    return (
        <div
            className={`content relative right-0 h-full w-full transition-all duration-300 ${
                isSidebarOpen ? 'w-[calc(100%-400px)]' : 'w-full'
            }`}
        >
            <div className="card rounded-lg">
                <div className="card-header">
                    <HeaderComponent />

                    <div className="w-full h-full">
                        <InputPrediction />
                        {isShowPredictionSteps && <DataPrepairation />}
                        <LayerSelector />
                        <MapShapeFile getJsonDataList={Object.values(compareLayer)} />
                        <ChartTab />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
