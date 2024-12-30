import React, { useState } from 'react';
import Sidebar from '../layout/sidebar/Sidebar';
import ChartContent from '../layout/chart/ChartContent.jsx';

function Chart() {
    const [isShowSidebar, setShowSidebar] = useState(false);

    const handleShowSidebar = () => {
        setShowSidebar(!isShowSidebar);
    };

    return (
        <div className="chart">
            <div className="wrapper flex w-screen bg-[#ededed] ">
                <Sidebar isShowSidebar={isShowSidebar} />
                {isShowSidebar && (
                    <div
                        onClick={() => setShowSidebar(!isShowSidebar)}
                        className="fixed cursor-pointer inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
                    ></div>
                )}
                <div className="map-box bg-[#ededed] flex-grow relative ml-[260px] max-custom:ml-0">
                    <ChartContent handleShowSidebar={handleShowSidebar} />
                </div>
            </div>
        </div>
    );
}

export default Chart;
