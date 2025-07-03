// src/components/SummaryCards.js
import React from 'react';
import StatCard from './StatCard';
import '../styles/SummaryCards.css';

const SummaryCards = () => {
  return (
    <div className="summary-cards">
      <StatCard title="Total Employees" count="150" color="#0984e3" />
      <StatCard title="Active" count="135" color="#00b894" />
      <StatCard title="Inactive" count="15" color="#d63031" />
    </div>
  );
};

export default SummaryCards;
