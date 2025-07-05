import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import StatsCards from '../StatsCards/StatsCards';
import RecentActivity from '../RecentActivity/RecentActivity';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'Priest',
  });

  // Ensure <html> gets the dark class for Tailwind to apply dark mode properly
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="dashboard-root bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar
        isDarkMode={isDarkMode}
        user={user}
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Section */}
      <div className="dashboard-main lg:ml-64">
        <Navbar
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
          user={user}
          onLogout={() => alert('Logout triggered')}
        />

        {/* Page Content */}
        <main className="dashboard-content p-6">
          {children || (
            <>
              <h1 className="dashboard-title text-2xl font-bold mb-2">
                Welcome back, {user.firstName}!
              </h1>
              <p className="dashboard-subtitle text-gray-600 dark:text-gray-400 mb-6">
                Here's what's happening in your parish today.
              </p>

              {/* Cards and Activity */}
              <div className="mb-6">
                <StatsCards isDarkMode={isDarkMode} />
              </div>
              <RecentActivity isDarkMode={isDarkMode} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
