import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ['Lua tom', 'Lua', 'Cay hang nam', 'Cay lau nam', 'Thuy san', 'Song', 'Dat xay dung', 'Rung'],
        datasets: [
            {
                label: '2022 - Inventory map',
                data: [0, 13489580.4, 527810.4, 2074621.6, 119975.1, 971604.1, 1203676.7, 0],
                backgroundColor: [
                    'rgba(255, 252, 140, 0.6)',
                    'rgba(255, 252, 130, 0.6)',
                    'rgba(255, 240, 120, 0.6)',
                    'rgba(255, 210, 160, 0.6)',
                    'rgba(170, 255, 255, 0.6)',
                    'rgba(160, 255, 255, 0.6)',
                    'rgba(255, 170, 160, 0.6)',
                    'rgba(190, 255, 30, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 252, 140, 1)',
                    'rgba(255, 252, 130, 1)',
                    'rgba(255, 240, 120, 1)',
                    'rgba(255, 210, 160, 1)',
                    'rgba(170, 255, 255, 1)',
                    'rgba(160, 255, 255, 1)',
                    'rgba(255, 170, 160, 1)',
                    'rgba(190, 255, 30, 1)',
                ],
                borderWidth: 1,
            },
            {
                label: '2023 - Land Use Status Map',
                data: [12700, 13806300, 877700, 2551300, 19600, 2700, 829500, 281500],
                backgroundColor: [
                    'rgba(255, 252, 140, 0.6)',
                    'rgba(255, 252, 130, 0.6)',
                    'rgba(255, 240, 120, 0.6)',
                    'rgba(255, 210, 160, 0.6)',
                    'rgba(170, 255, 255, 0.6)',
                    'rgba(160, 255, 255, 0.6)',
                    'rgba(255, 170, 160, 0.6)',
                    'rgba(190, 255, 30, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 252, 140, 1)',
                    'rgba(255, 252, 130, 1)',
                    'rgba(255, 240, 120, 1)',
                    'rgba(255, 210, 160, 1)',
                    'rgba(170, 255, 255, 1)',
                    'rgba(160, 255, 255, 1)',
                    'rgba(255, 170, 160, 1)',
                    'rgba(190, 255, 30, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Area chart of current land use status and classification results',
                color: 'white',
            },
            legend: {
                display: false,
            },
        },
        datalabels: {
            color: '#fff',
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
        animation: {
            duration: 1000,
            easing: 'easeInOutBounce',
        },
    };

    return (
        <div className="w-full h-full">
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
