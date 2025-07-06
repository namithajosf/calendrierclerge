import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatsCards from "./StatsCards";
import RecentActivity from "./RecentActivity";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Apply theme to root HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Fetch user on mount
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("User fetch error:", err);
        // Optionally redirect to login if unauthorized
        if (err.response?.status === 403 || err.response?.status === 401) {
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/logout/", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        Loading user...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-red-500">
        Failed to load user. Please <a href="/login" className="underline ml-1">login</a>.
      </div>
    );
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
          toggleTheme={() => setIsDarkMode((prev) => !prev)}
          user={user}
          onLogout={handleLogout}
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
