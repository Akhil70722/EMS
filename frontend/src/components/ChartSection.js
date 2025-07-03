// src/components/ChartSection.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import '../styles/ChartSection.css';

Chart.register(BarElement, CategoryScale, LinearScale);

const ChartSection = () => {
  const data = {
    labels: ['IT', 'HR', 'Sales', 'Marketing'],
    datasets: [
      {
        label: 'Employees by Department',
        data: [45, 25, 30, 50],
        backgroundColor: ['#74b9ff', '#55efc4', '#ffeaa7', '#fab1a0'],
      },
    ],
  };

  return (
    <div className="chart-section">
      <h3>Department Distribution</h3>
      <Bar data={data} />
    </div>
  );
};

export default ChartSection;
