import { useDispatch, useSelector } from 'react-redux';
import { selectChartTypeList, selectCurrentChart, setChartType } from '../../features/setting/settingSlice';
import { useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

function ChartSetting({ isOpen }) {
    const currentChart = useSelector(selectCurrentChart);
    const chartList = useSelector(selectChartTypeList);
    const dispatch = useDispatch();

    const [selectedType, setSelectedType] = useState(currentChart.title);

    const handleSelectChart = (chartName) => {
        setSelectedType(chartList[chartName].title);
        dispatch(setChartType(chartName));
    };

    return (
        <div
            className={`absolute top-11 right-[60%] z-[10000] bg-[#3f4854] bg-opacity-[0.9] shadow p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out origin-top-right ${
                isOpen ? 'scale-100' : 'scale-0'
            }`}
        >
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
        </div>
    );
}

export default ChartSetting;