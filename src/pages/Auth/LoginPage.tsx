import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./Auth.css";

// Interface for type safety
interface LoginFormState {
  email: string;
  password: string;
}

const LoginForm = () => {
  // Use useState with initial state values
  const [state, setState] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const { email, password } = state; // Destructure state values

  // Handle form submission

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful!");
        return <Navigate to="/" replace />;
      } else {
        // Handle login error
        console.error("Login failed: ", response.data);
        // Display error message to user
      }
    } catch (error) {
      console.error("Error during login: ", error);
      // Display generic error message to user
    } finally {
      // Reset form fields after submission (optional)
      setState({ email: "", password: "" });
    }
  };

  // Handle input changes
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
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>

        <div id="formFooter">
          <Link to="/signup" className="underlineHover">
            Inscrivez-vous, si vous êtes un utilisateur existant
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
