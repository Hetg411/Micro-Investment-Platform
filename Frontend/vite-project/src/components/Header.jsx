import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="header">

      <div className="logo">
        <div className="logo-icon">M</div>
        <span>MicroVest</span>
      </div>

      <div className="header-actions">

        {!token ? (
          <>
            <button
              className="signin-btn"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>

            <button
              className="signup-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            className="logout-btn"
            onClick={logout}
          >
            Sign Out
          </button>
        )}

      </div>

    </header>
  );
}

export default Header;