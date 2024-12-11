import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Blue Archive データベース</h1>
      <nav className="header-nav">
        <Link to="/guide" className="nav-link">
          使い方
        </Link>
      </nav>
    </header>
  );
};
