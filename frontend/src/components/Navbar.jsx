import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Sun, Moon, LogOut } from 'lucide-react'

const Navbar = ({ isDarkMode, toggleTheme, user, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('en')

  const profileRef = useRef(null)
  const langRef = useRef(null)

  const languages = [
    { code: 'en', name: 'English', flag: '/flags/en.png' },
    { code: 'fr', name: 'Français', flag: '/flags/fr.png' },
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false)
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLanguage = languages.find((lang) => lang.code === selectedLang)

  return (
    <header
      className={`shadow-sm border-b transition-colors duration-200 ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center justify-end px-6 py-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Language Selector */}
        <div ref={langRef} className="relative ml-4">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 flex items-center justify-center"
          >
            <img
              src={selectedLanguage.flag}
              alt={selectedLanguage.code}
              className="w-5 h-5 object-cover rounded-full"
            />
          </button>
          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow z-50">
              {languages.map(({ code, name, flag }) => (
                <button
                  key={code}
                  onClick={() => {
                    setSelectedLang(code)
                    setIsLangOpen(false)
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 w-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedLang === code
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : ''
                  }`}
                >
                  <img
                    src={flag}
                    alt={code}
                    className="w-5 h-5 object-cover rounded-full"
                  />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative ml-4">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <img
              src="/avatar.png"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
            />
            <ChevronDown
              className={`transition-transform duration-200 ${
                isProfileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-lg shadow-lg border z-50 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center space-x-3 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                <img
                  src="/avatar.png"
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                />
                <div>
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      user.role === 'Priest'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : user.role === 'Admin'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="w-full flex items-center space-x-3 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
                <button
                  className="flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300 px-2 py-1 rounded"
                  onClick={onLogout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
