import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#4D2C91",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "60px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginLeft: "50px" }}>Ads Dashboard</h2>
      <nav>
        <Link to="/" style={{ color: "white", marginRight: "30px" }}>
          Dashboard
        </Link>
        <Link to="/create" style={{ color: "white", marginRight: "70px" }}>
          Create Ad
        </Link>
      </nav>
    </header>
  );
};

export default Header;
