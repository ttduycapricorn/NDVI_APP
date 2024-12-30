import { useState } from 'react';
import { FaCompressAlt, FaExpandAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectCurrentChart, selectChartTabStatus } from '../../features/setting/settingSlice';

function ChartTab() {
    const ChartElement = useSelector(selectCurrentChart).element;
    const chartTabStatus = useSelector(selectChartTabStatus);

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return chartTabStatus ? (
        <div
            className={`absolute ${
                isExpanded
                    ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] scale-100'
                    : 'bottom-5 left-5 w-[300px] h-[200px] scale-90'
            } 
        z-[9999] bg-[#3f4854] bg-opacity-90 shadow-lg rounded-lg p-4 transition-all duration-500 ease-in-out`}
            style={{
                transformOrigin: isExpanded ? 'center center' : 'bottom left',
            }}
        >
            <div className="relative flex justify-between items-center w-full h-full">
                <button
                    onClick={toggleExpand}
                    className="absolute top-0 right-0 text-white bg-blue-500 p-1 rounded hover:bg-blue-600 transition duration-200"
                >
                    {isExpanded ? <FaCompressAlt /> : <FaExpandAlt />}
                </button>
                <div className={`transition-all w-full h-full flex justify-center items-center`}>
                    <ChartElement isExpanded={isExpanded} />
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
}

export default ChartTab;
