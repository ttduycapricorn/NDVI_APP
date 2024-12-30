import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import 'chartjs-chart-sankey'; // Import the Sankey plugin
import { SankeyController, Flow } from 'chartjs-chart-sankey';
import GetSankeyData from '../../services/getSankeyData';

Chart.register(SankeyController, Flow);

const SankeyChart = ({ isExpanded }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [sankeyData, setSankeyData] = useState([]); // State to store Sankey data

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            const data = await GetSankeyData();
            if (data) {
                const rawData = data.map((item) => ({
                    from: `2022 - ${item.from}`,
                    to: `2023 - ${item.to}`,
                    flow: item.flow,
                }));
                setSankeyData(rawData); // Set the fetched data to the state
            }
        };

        fetchData();
    }, []); // Empty dependency array means this will run once on component mount

    useEffect(() => {
        if (sankeyData.length === 0) return; // Only render chart if data is available

        const ctx = chartRef.current.getContext('2d');

        const colors = {
            '2022 - Cay hang nam': '#f4a261',
            '2022 - Cay lau nam': '#e76f51',
            '2022 - Dat xay dung': '#2a9d8f',
            '2022 - Lua': '#43a047',
            '2022 - Song': '#1d3557',
            '2022 - Thuy san': '#457b9d',
            '2023 - Cay hang nam': '#ffb703',
            '2023 - Cay lau nam': '#fb8500',
            '2023 - Dat xay dung': '#219ebc',
            '2023 - Lua': '#43a047',
            '2023 - Rung': '#8ecae6',
        };

        const getHover = (key) => (key.includes('Lua') ? '#76d275' : colors[key] || 'gray');
        const getColor = (key) => (key.includes('Lua') ? '#43a047' : colors[key] || 'gray');

        if (chartInstance.current) chartInstance.current.destroy();

        chartInstance.current = new Chart(ctx, {
            type: 'sankey',
            data: {
                datasets: [
                    {
                        label: 'Biểu đồ Sankey',
                        data: sankeyData,
                        colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
                        colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
                        hoverColorFrom: (c) => getHover(c.dataset.data[c.dataIndex].from),
                        hoverColorTo: (c) => getHover(c.dataset.data[c.dataIndex].to),
                        colorMode: 'gradient',
                        alpha: 0.8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Sankey diagram of land use change',
                        color: 'white',
                        font: {
                            size: isExpanded ? 18 : 10,
                            weight: 'bold',
                        },
                    },
                    datalabels: {
                        display: false,
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: 'white',
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        y: {
                            ticks: {
                                color: 'white',
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) chartInstance.current.destroy();
        };
    }, [isExpanded, sankeyData]); // Re-render when isExpanded or sankeyData changes

    return (
        <div className={`w-full h-full ${isExpanded ? 'p-4' : 'p-2'}`}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default SankeyChart;
