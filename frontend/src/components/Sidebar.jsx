import React from "react";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  Trash2
} from "lucide-react";

const Sidebar = ({
  isDarkMode,
  user,
  currentPath,
  onNavigate,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const getSidebarItems = () => {
    const baseItems = [
      { path: "/", icon: LayoutDashboard, label: "Dashboard" },
      { path: "/events", icon: Calendar, label: "Events" }
    ];

    if (user?.role === "Priest") {
      return [...baseItems, { path: "/settings", icon: Settings, label: "Settings" }];
    } else if (user?.role === "Admin") {
      return [
        ...baseItems,
        { path: "/settings", icon: Settings, label: "Settings" },
        { path: "/trash", icon: Trash2, label: "Trash" }
      ];
    } else {
      return baseItems;
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 transform transition-transform duration-300 ease-in-out z-50 border-r
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isDarkMode ? "bg-gray-800 border-gray-800" : "bg-blue-800 border-gray-200"}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center p-6">
        <img
          src="/white-logo.svg"
          alt="Calendrier Clergé Logo"
          className="h-20"
        />
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map(({ path, icon: Icon, label }) => {
          const isActive =
            currentPath === path || (path === "/events" && currentPath.includes("/event"));

          return (
            <button
              key={path}
              onClick={() => {
                onNavigate(path);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-sm transition-colors
                ${isActive
                  ? "bg-white text-blue-950 dark:bg-gray-100 dark:text-blue-900"
                  : "text-blue-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"}`}
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
