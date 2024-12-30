import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


// Register Pie chart elements
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ isExpanded }) => {
    const colors = [
        'rgba(255, 252, 140, 0.6)',
        'rgba(255, 252, 130, 0.6)',
        'rgba(255, 240, 120, 0.6)',
        'rgba(255, 210, 160, 0.6)',
        'rgba(170, 255, 255, 0.6)',
        'rgba(160, 255, 255, 0.6)',
        'rgba(255, 170, 160, 0.6)',
        'rgba(190, 255, 30, 0.6)',
    ];

    const data1 = {
        labels: ['Lua tom', 'Lua', 'Cay hang nam', 'Cay lau nam', 'Thuy san', 'Song', 'Dat xay dung', 'Rung'],
        datasets: [
            {
                label: '2023 - Land Use Status Map',
                data: [0.069092, 75.110574, 4.774962, 13.879867, 0.10663, 0.014689, 4.512738, 1.531448],
                backgroundColor: colors,
                borderColor: colors.map((color) => color.replace('0.6', '1')),
                borderWidth: 1,
            },
        ],
    };

    const data2 = {
        labels: ['Lua tom', 'Lua', 'Cay hang nam', 'Cay lau nam', 'Thuy san', 'Song', 'Dat xay dung', 'Rung'],
        datasets: [
            {
                label: '2022 - Inventory map',
                data: [0, 73.36, 2.87, 11.28, 0.65, 5.28, 6.55, 0],
                backgroundColor: colors,
                borderColor: colors.map((color) => color.replace('0.6', '1')),
                borderWidth: 1,
            },
        ],
    };

    const options1 = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '2023 - Land Use Status Map',
                color: 'white',
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem) {
                        const dataset = tooltipItem.dataset.data;
                        const total = dataset.reduce((acc, curr) => acc + curr, 0);
                        const value = dataset[tooltipItem.dataIndex];
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${value} (${percentage}%)`;
                    },
                },
            },
            datalabels: {
                color: '#fff',
                formatter: (value, context) => {
                    const dataset = context.dataset.data;
                    const total = dataset.reduce((acc, curr) => acc + curr, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return isExpanded ? `${percentage}%` : null;
                },
            },
        },
    };

    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '2022 - Inventory Map',
                color: 'white',
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem) {
                        const dataset = tooltipItem.dataset.data;
                        const total = dataset.reduce((acc, curr) => acc + curr, 0);
                        const value = dataset[tooltipItem.dataIndex];
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${value} (${percentage}%)`;
                    },
                },
            },
            datalabels: {
                color: '#fff',
                formatter: (value, context) => {
                    const dataset = context.dataset.data;
                    const total = dataset.reduce((acc, curr) => acc + curr, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return isExpanded ? `${percentage}%` : null;
                },
            },
        },
    };

    return (
        <div className={`w-full h-full flex flex-col items-center justify-center ${isExpanded ? 'p-4' : 'p-0'}`}>
            <div className={`w-full h-[70%] flex justify-center grow items-center ${isExpanded ? 'mb-4' : 'mb-0'}`}>
                <div className="w-[48%] h-full flex items-center justify-center">
                    <Pie data={data1} options={options1} />
                </div>
                <div className="w-[48%] h-full flex items-center justify-center">
                    <Pie data={data2} options={options2} />
                </div>
            </div>

            {/* Shared Legend with Transition */}
            <div
                className="flex flex-col  justify-center items-center "
                style={{
                    transform: isExpanded ? 'scale(1)' : 'scale(0.4)',
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease-in-out',
                }}
            >
                <h1 className="text-white">Comparison of Land Use Changes</h1>
                <div className="flex h-10 space-x-4 mt-2">
                    {data1.labels.map((label, index) => (
                        <div key={label} className="flex items-center space-x-2">
                            <div
                                style={{
                                    backgroundColor: data1.datasets[0].backgroundColor[index],
                                }}
                                className="w-4 h-4"
                            ></div>
                            <span className="text-white">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PieChart;
