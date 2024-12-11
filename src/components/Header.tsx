import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import "./Header.css";
import logo from "/logo_transparent.png";

export const Header = () => {
  const location = useLocation();
  const isUsagePage = location.pathname === "/usage";

  return (
    <header className="header">
      <div className="header-title">
        <img src={logo} alt="Blue Archive Database" className="header-logo" />
      </div>
      <nav className="header-nav">
        <Button
          component={Link}
          to={isUsagePage ? "/" : "/usage"}
          color="inherit"
          className="nav-link"
        >
          {isUsagePage ? "戻る" : "BlueAnalysisについて"}
        </Button>
      </nav>
    </header>
  );
};
