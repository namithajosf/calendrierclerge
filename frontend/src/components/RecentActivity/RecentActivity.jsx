import React from 'react';
import { Calendar, Church } from 'lucide-react';
import './RecentActivity.css';

const RecentActivity = ({ isDarkMode }) => {
  return (
    <div className="activity-card">
      <h2 className="activity-title">Recent Activity</h2>
      <div className="activity-list">
        <div className="activity-item">
          <div className="activity-icon bg-blue">
            <Calendar className="icon text-blue" />
          </div>
          <div>
            <p className="activity-text">Sunday Mass scheduled</p>
            <p className="activity-time">2 hours ago</p>
          </div>
        </div>

        <div className="activity-item">
          <div className="activity-icon bg-green">
            <Church className="icon text-green" />
          </div>
          <div>
            <p className="activity-text">New parish added</p>
            <p className="activity-time">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
