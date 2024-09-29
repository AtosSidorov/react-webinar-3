// src/components/main-menu/index.js
import { Link } from 'react-router-dom';
import './style.css';

function MainMenu() {
  return (
    <nav className="MainMenu">
      <Link to="/catalog" className="MainMenu-link">Главная</Link>
    </nav>
  );
}

export default MainMenu;