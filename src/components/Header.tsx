import "./Header.css";
import { Link, useLocation } from "react-router-dom";

function getLinkClass(path: string): string {
  return location.pathname === path ? "link-active" : "link";
}

const Header = () => {
  const location = useLocation();

  return (
    <header className="the-head">
      <h2 className="header-title">Ads Dashboard</h2>
      <nav>
        <Link to="/" className={getLinkClass("/")}>
          Dashboard
        </Link>
        <Link to="/create" className={getLinkClass("/create")}>
          Create Ad
        </Link>
      </nav>
    </header>
  );
};

export default Header;
