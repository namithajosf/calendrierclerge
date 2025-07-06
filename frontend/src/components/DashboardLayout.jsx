import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StatsCards from './StatsCards';
import RecentActivity from './RecentActivity';

const DashboardLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Theme toggle effect
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Fetch authenticated user
  useEffect(() => {
    fetch('/api/user/', {
      credentials: 'include', // Use JWT or session cookies
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.error('User fetch error:', err);
        // Optional: redirect to login or show error UI
      });
  }, []);

  if (!user) {
    return <div className="p-6 text-center">Loading user...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar
        isDarkMode={isDarkMode}
        user={user}
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main content */}
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <Navbar
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
          user={user}
          onLogout={() => alert('Logout triggered')}
        />

        <main className="px-6 py-6 space-y-6">
          {children || (
            <>
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {user.first_name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Here's what's happening in your parish today.
              </p>

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
