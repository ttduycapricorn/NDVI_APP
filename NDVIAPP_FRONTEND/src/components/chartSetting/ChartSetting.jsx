import { useDispatch, useSelector } from 'react-redux';
import {
    selectChartTypeList,
    selectCurrentChart,
    setChartType,
    toggleChartTab,
} from '../../features/setting/settingSlice';
import { useState } from 'react';
import { FaRegCheckCircle, FaCheck } from 'react-icons/fa';
import { selectDistricted } from '../../features/predictionSteps/predictionStepsSlice.jsx';

function ChartSetting({ isOpen }) {
    const currentChart = useSelector(selectCurrentChart);
    const chartList = useSelector(selectChartTypeList);
    const dispatch = useDispatch();

    const [selectedType, setSelectedType] = useState(currentChart.title);

    const isPredicted = useSelector(selectDistricted);

    const handleSelectChart = (chartName) => {
        setSelectedType(chartList[chartName].title);
        dispatch(setChartType(chartName));
    };

    const handleShowChartTab = () => {
        dispatch(toggleChartTab());
    };

    return (
        <div
            className={`absolute min-w-[250px] top-11 right-[60%] z-[10000] bg-[#3f4854] bg-opacity-[0.9] shadow p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out origin-top-right ${
                isOpen ? 'scale-100' : 'scale-0'
            }`}
        >
            {isPredicted ? (
                <>
                    <div className="flex flex-col gap-2 w-[250px] cursor-pointer">
                        {Object.keys(chartList).map((chartName, index) => (
                            <div
                                className={`relative text-nowrap rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:border-[#dadbd6] hover:bg-opacity-80 hover:shadow-lg ${
                                    selectedType === chartList[chartName].title
                                        ? 'border-2 border-blue-500'
                                        : 'border border-transparent'
                                }`}
                                key={index}
                                onClick={() => handleSelectChart(chartName)}
                            >
                                <h2 className="absolute w-full p-1 bg-[#dadbd6] bg-opacity-[0.5] rounded-b bottom-0 text-white text-xs font-bold text-center transition-all duration-300">
                                    {chartList[chartName].title}
                                </h2>
                                {selectedType === chartList[chartName].title && (
                                    <FaRegCheckCircle className="absolute top-1 right-1 text-blue-500" />
                                )}
                                <img
                                    className="w-full h-auto object-contain transition-transform duration-300 ease-in-out hover:scale-105"
                                    src={chartList[chartName].image}
                                    alt={chartList[chartName].title}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center mt-4">
                        {/* Simplified Checkbox */}
                        <div className="relative">
                            <input
                                onChange={handleShowChartTab}
                                className=" w-4 h-4 border-2 border-gray-400 rounded-sm bg-transparent focus:outline-none cursor-pointer transition duration-300 ease-in-out"
                                type="checkbox"
                                name="showChartTab"
                                id="showChartTab"
                            />
                        </div>
                        {/* Label */}
                        <label
                            htmlFor="showChartTab"
                            className="ml-2 text-sm text-white font-medium cursor-pointer hover:text-blue-400 transition duration-300 ease-in-out"
                        >
                            Show Chart
                        </label>
                    </div>
                </>
            ) : (
                <p className="text-center text-white font-semibold text-lg mt-4">Not predicted yet</p>
            )}
        </div>
    );
}

export default ChartSetting;
