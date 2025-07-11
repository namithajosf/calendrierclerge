import React from 'react';
import { Calendar, Church } from 'lucide-react';

const RecentActivity = ({ isDarkMode }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
      <div className="space-y-4">
        {/* Activity 1 */}
        <div className="ml-6 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">Sunday Mass scheduled</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
          </div>
        </div>

        {/* Activity 2 */}
        <div className="ml-6 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900">
            <Church className="w-5 h-5 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">New parish added</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
