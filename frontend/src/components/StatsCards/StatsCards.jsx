import React from 'react';
import { Calendar, Church, Settings } from 'lucide-react';
import './StatsCards.css';

const StatsCards = ({ isDarkMode }) => {
  return (
    <div className="stats-grid">
      <div className="stats-card">
        <div className="stats-content">
          <div>
            <p className="stats-label">Total Events</p>
            <p className="stats-value">24</p>
          </div>
          <div className="stats-icon bg-blue">
            <Calendar className="icon text-blue" />
          </div>
        </div>
      </div>

      <div className="stats-card">
        <div className="stats-content">
          <div>
            <p className="stats-label">This Week</p>
            <p className="stats-value">8</p>
          </div>
          <div className="stats-icon bg-green">
            <Calendar className="icon text-green" />
          </div>
        </div>
      </div>

      <div className="stats-card">
        <div className="stats-content">
          <div>
            <p className="stats-label">Parishes</p>
            <p className="stats-value">4</p>
          </div>
          <div className="stats-icon bg-purple">
            <Church className="icon text-purple" />
          </div>
        </div>
      </div>

      <div className="stats-card">
        <div className="stats-content">
          <div>
            <p className="stats-label">Pending</p>
            <p className="stats-value">3</p>
          </div>
          <div className="stats-icon bg-yellow">
            <Settings className="icon text-yellow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
