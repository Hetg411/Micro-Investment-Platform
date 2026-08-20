
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SignIn() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");

      const response = await API.post(
        "/authentication/signin",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          M
        </div>

        <h1>Welcome to MicroVest</h1>

        <p>
          Sign in to manage your investments
        </p>


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            required
          />


          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
            required
          />


          <button
            type="submit"
            className="primary-button"
          >
            Sign In
          </button>

        </form>


        <p className="auth-footer">

          Don't have an account?

          <button
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>

        </p>

      </div>

    </div>

  );
}

export default SignIn;