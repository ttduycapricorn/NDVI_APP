/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/jsx-no-comment-textnodes */
import { FaBars } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import HeaderComponent from '../header/HeaderComponent';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import SankeyChart from '../../components/charts/SankeyChart';
// import BarChart from '../../components/charts/BarChart';
// import LineChart from '../../components/charts/LineChart';

function ChartContent({ handleShowSidebar }) {
    const { t } = useTranslation();

    return (
        <div className="content h-screen overflow-y-scroll max-custom:w-screen">
            {/* <HeaderComponent
                title={t('titleCTU')}
                fontStyle="text-[1rem] text-[#fff] font-light leading-[30px] overflow-hidden text-left block whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.3)] max-custom:w-full"
                icon={<FaBars className="h-[24px] w-[42px] cursor-pointer" />}
                handleShowSidebar={handleShowSidebar}
            />
            <div className="card p-4 rounded-lg bg-white">
                <div className="card-header">
                    <h1 className="card-title text-sm text-[#3C4858] font-extralight">{t('titleChar')}</h1>
                    <div className="card-nav p-4">
                        <div className="chart-wrapper shadow-custom">
                            {/* <BarChart /> */}
            <div className="my-[25px]">
                <div className="flex gap-[200px] max-custom:w-max">
                    <div className="w-max py-[30px]">
                        <PieChart />
                    </div>
                    <div className="w-max h-max py-[75px] justify-end">
                        <SankeyChart />
                    </div>
                </div>
            </div>
            {/* <LineChart titleChart={'Biểu đồ đường thể hiện biến động giữa các đường trong Thuận Hòa'} /> */}
            <SankeyChart />
        </div>
    );
}

export default ChartContent;
