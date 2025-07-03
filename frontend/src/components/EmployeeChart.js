import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../styles/EmployeeChart.css';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const EmployeeChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data), // e.g. ["HR", "Sales", "Engineering"]
    datasets: [
      {
        label: 'Employees by Department',
        data: Object.values(data), // e.g. [5, 10, 3]
        backgroundColor: [
          '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px', margin: '2rem 0' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EmployeeChart;
