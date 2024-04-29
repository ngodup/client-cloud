import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import AuthContext from "../../context/AuthContext";

interface LoginFormState {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { handleLogin, error, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const { email, password } = state;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await handleLogin(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="active"> Sign In </h2>

        <div className="fadeIn first">
          <img src="/avatar.jpg" alt="Avatar" id="icon" />
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="login"
            className="fadeIn second"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
          />
          <input type="submit" className="fadeIn fourth btn" value="Log In" />
        </form>

        <div id="formFooter">
          <div className="auth-footer-link">
            <Link to="/signup" className="underlineHover">
              Inscrivez-vous, si vous êtes un utilisateur existant
            </Link>
            <Link to="/" className="underlineHover">
              Accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
