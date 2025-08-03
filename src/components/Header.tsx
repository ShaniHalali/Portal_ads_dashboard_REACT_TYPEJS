import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="the-head">
      <h2 className="header-title">Ads Dashboard</h2>
      <nav>
        <Link className="dash-link" to="/">
          Dashboard
        </Link>
        <Link className="create-link" to="/auth">
          Create Ad
        </Link>
      </nav>
    </header>
  );
};

export default Header;
