import React from "react";
import { LayoutDashboard, Calendar, Settings, Trash2 } from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({
  isDarkMode,
  user,
  currentPath,
  onNavigate,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const getSidebarItems = () => {
    const baseItems = [
      { path: "/", icon: LayoutDashboard, label: "Dashboard" },
      { path: "/events", icon: Calendar, label: "Events" },
    ];

    if (user?.role === "Priest") {
      return [
        ...baseItems,
        { path: "/settings", icon: Settings, label: "Settings" },
      ];
    } else if (user?.role === "Admin") {
      return [
        ...baseItems,
        { path: "/settings", icon: Settings, label: "Settings" },
        { path: "/trash", icon: Trash2, label: "Trash" },
      ];
    } else {
      return baseItems;
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <div
      className={`sidebar-wrapper ${isMobileMenuOpen ? "open" : ""} ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="sidebar-logo">
        <img
          src="/white-logo.svg"
          alt="Calendrier Clergé Logo"
          className="logo-img"
        />
      </div>

      <nav className="sidebar-nav">
        {sidebarItems.map(({ path, icon: Icon, label }) => {
          const isActive =
            currentPath === path ||
            (path === "/events" && currentPath.includes("/event"));
          return (
            <button
              key={path}
              onClick={() => {
                onNavigate(path);
                setIsMobileMenuOpen(false);
              }}
              className={`sidebar-item ${isActive ? "active" : ""}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
