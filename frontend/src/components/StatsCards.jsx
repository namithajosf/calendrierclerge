import React from 'react';
import { Calendar, Church, Settings } from 'lucide-react';

const StatsCards = ({ isDarkMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Events */}
      <div className="p-6 rounded-lg shadow-sm bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Events</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
          </div>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900">
            <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* This Week */}
      <div className="p-6 rounded-lg shadow-sm bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
          </div>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100 dark:bg-green-900">
            <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Parishes */}
      <div className="p-6 rounded-lg shadow-sm bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Parishes</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
          </div>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-100 dark:bg-purple-900">
            <Church className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Pending */}
      <div className="p-6 rounded-lg shadow-sm bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
          </div>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-yellow-100 dark:bg-yellow-900">
            <Settings className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
