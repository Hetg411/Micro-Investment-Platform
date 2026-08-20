import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SignUp() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");

      await API.post(
        "/authentication/signup",
        {
          username,
          email,
          password
        }
      );

      navigate("/signin");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Signup failed"
      );

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          M
        </div>

        <h1>Create your account</h1>

        <p>
          Start your journey with MicroVest
        </p>


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        <form onSubmit={handleSubmit}>

          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            placeholder="Enter username"
            required
          />


          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter email"
            required
          />


          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Create password"
            required
          />


          <button
            type="submit"
            className="primary-button"
          >
            Create Account
          </button>

        </form>


        <p className="auth-footer">

          Already have an account?

          <button
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>

        </p>

      </div>

    </div>

  );
}

export default SignUp;