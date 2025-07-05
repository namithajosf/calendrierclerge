import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Sun, Moon, LogOut, User, Settings } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ isDarkMode, toggleTheme, user, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');

  const profileRef = useRef(null);
  const langRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '/flags/en.png' },
    { code: 'fr', name: 'Français', flag: '/flags/fr.png' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLanguage = languages.find(lang => lang.code === selectedLang);

  return (
    <header className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      <div className="navbar-content">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Language Selector */}
        <div ref={langRef} className="lang-selector">
          <button onClick={() => setIsLangOpen(!isLangOpen)} className="lang-btn">
            <img src={selectedLanguage.flag} alt={selectedLanguage.code} className="lang-flag" />
          </button>
          {isLangOpen && (
            <div className="lang-dropdown">
              {languages.map(({ code, name, flag }) => (
                <button
                  key={code}
                  onClick={() => {
                    setSelectedLang(code);
                    setIsLangOpen(false);
                  }}
                  className={`lang-option ${selectedLang === code ? 'active' : ''}`}
                >
                  <img src={flag} alt={code} className="lang-flag" />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="profile-container">
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="profile-btn">
            <img src="/avatar.png" alt="Profile" className="profile-avatar" />
            <ChevronDown className={`chevron ${isProfileOpen ? 'rotate' : ''}`} />
          </button>
          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <img src="/avatar.png" alt="Profile" className="profile-large" />
                <div>
                  <h5>{user.firstName} {user.lastName}</h5>
                  <p>{user.email}</p>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span>
                </div>
              </div>
              <div className="profile-actions">
                <button className="logout-btn" onClick={onLogout}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
