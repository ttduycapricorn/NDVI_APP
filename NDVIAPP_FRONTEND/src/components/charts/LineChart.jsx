import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart() {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Bien hoa 1',
                data: [65, 10, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1, // For smooth curves
            },
            {
                label: 'Dataset 2',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.1, // For smooth curves
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Biểu đồ đường thể hiện biến động giữa các đường trong Thuận Hòa',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Value',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full">
            <Line data={data} options={options} />
        </div>
    );
}

export default LineChart;
