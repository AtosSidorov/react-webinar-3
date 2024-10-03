import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style.css'; 

function UserMenu() {
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

  const username = localStorage.getItem('username') || 'Пользователь'; 

  return (
    <div className="user-menu">
      {isAuthenticated ? (
        <>
          <Link to="/profile" className="user-menu-link"> 
            {username}
          </Link>
          <button onClick={handleLogout} className="user-menu-button">
            Выход
          </button>
        </>
      ) : (
        <button onClick={handleLogin} className="user-menu-button">
          Вход
        </button>
      )}
    </div>
  );
}

export default UserMenu;
