import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';  // Используем хук для перевода
import './style.css'; 

function UserMenu() {
  const { t } = useTranslate();  // Получаем функцию для перевода
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false); 
    navigate('/login'); 
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const username = localStorage.getItem('username') || t('user');  // Перевод для имени пользователя

  return (
    <div className="user-menu">
      {isAuthenticated ? (
        <>
          <Link to="/profile" className="user-menu-link"> 
            {username}
          </Link>
          <button onClick={handleLogout} className="user-menu-button">
            {t('logout')}  {/* Перевод для кнопки "Выход" */}
          </button>
        </>
      ) : (
        <button onClick={handleLogin} className="user-menu-button">
          {t('login.button')}  {/* Перевод для кнопки "Вход" */}
        </button>
      )}
    </div>
  );
}

export default UserMenu;
