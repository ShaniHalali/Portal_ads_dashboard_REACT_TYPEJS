import "./Header.css";
import { Link, useLocation } from "react-router-dom";

function getLinkClass(path: string, currentPath: string): string {
  return currentPath === path ? "link-active" : "link";
}

const Header = () => {
  const location = useLocation();

  return (
    <header className="the-head">
      <h2 className="header-title">Ads Dashboard</h2>
      <nav>
        <Link to="/" className={getLinkClass("/", location.pathname)}>
          Dashboard
        </Link>
        <Link to="/auth" className={getLinkClass("/create", location.pathname)}>
          Create Ad
        </Link>
      </nav>
    </header>
  );
};

export default Header;
