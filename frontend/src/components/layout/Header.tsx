import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ThemeSwitch from '@/components/ui/ThemeSwitch';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          {/* 侧边栏切换按钮 */}
          <button 
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label={t('app.toggleSidebar')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* 应用标题 */}
          <h1 className="ml-4 text-xl font-bold text-gray-900 dark:text-white">{t('app.title')}</h1>
        </div>
        
        {/* 用户信息和操作 */}
        <div className="flex items-center space-x-4">
          {/* Theme Switch */}
          <ThemeSwitch />
          
          {auth.user && (
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('app.welcomeUser', { username: auth.user.username })}
            </span>
          )}
          
          <div className="flex space-x-2">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-800 text-sm"
            >
              {t('app.logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;