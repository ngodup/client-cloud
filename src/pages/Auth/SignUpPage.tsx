import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { Link } from "react-router-dom";

interface SignUpFormState {
  email: string;
  password: string;
  prenom: string;
  nom: string;
  dateDeNaissance: string;
  phoneNumber: string;
  address: string;
  ville: string;
  codePostal: string; // Need to convert to string at server
}

const SignUpPage = () => {
  const [state, setState] = useState<SignUpFormState>({
    email: "",
    password: "",
    prenom: "",
    nom: "",
    dateDeNaissance: "",
    phoneNumber: "",
    address: "",
    ville: "",
    codePostal: "",
  });

  const [loginMessage, setLoginMessage] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const {
    email,
    password,
    prenom,
    nom,
    dateDeNaissance,
    phoneNumber,
    address,
    ville,
    codePostal,
  } = state;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/register", {
        email,
        password,
        prenom,
        nom,
        dateDeNaissance,
        phoneNumber,
        address,
        ville,
        codePostal,
      });
      setLoginAttempted(true);
      if (response.status === 201 || response.status === 200) {
        setLoginMessage("Registration successful!");
        console.log("Registration successful!");
        setLoginError(false);
      } else {
        console.error("Registration failed: ", response.data);
        setLoginMessage(response.data.message);
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error during registration: ", error);
      setLoginMessage((error as Error).message);
      setLoginError(true);
    } finally {
      setState({
        email: "",
        password: "",
        prenom: "",
        nom: "",
        dateDeNaissance: "",
        phoneNumber: "",
        address: "",
        ville: "",
        codePostal: "",
      });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const loginMessageElement = loginAttempted && (
    <div className={`login-message ${loginError ? "error" : "success"}`}>
      {loginMessage}
    </div>
  );

  return (
    <div className="wrapper fadeInDown">
      <div id="form-signup-wrapper">
        <h2 className="active">Registeration a new User</h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="field-container">
              <label htmlFor="email">Email*</label>
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
            </div>
            <div className="field-container">
              <label htmlFor="nom">Password*</label>
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
            </div>
          </div>
          <div className="row">
            <div className="field-container">
              <label htmlFor="prenom">Prenom*</label>
              <input
                type="text"
                className="fadeIn second"
                name="prenom"
                placeholder="Prenom"
                value={prenom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field-container">
              <label htmlFor="nom">Nom*</label>
              <input
                type="text"
                className="fadeIn second"
                name="nom"
                placeholder="Nom"
                value={nom}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="field-container">
              <label htmlFor="dateDeNaissance">Date de naissance</label>
              <input
                type="date"
                className="fadeIn second"
                name="dateDeNaissance"
                value={dateDeNaissance}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-container">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                className="fadeIn second"
                name="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field-container">
            <label htmlFor="address">Address</label>
            <textarea
              className="fadeIn second"
              rows={3}
              name="address"
              placeholder="Address"
              value={address}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <div className="field-container">
              <label htmlFor="ville">Ville</label>
              <input
                type="text"
                className="fadeIn second"
                name="ville"
                placeholder="Ville"
                value={ville}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-container">
              <label htmlFor="codePostal">Code Postal</label>
              <input
                type="text"
                className="fadeIn second"
                name="codePostal"
                placeholder="Code Postal"
                value={codePostal}
                onChange={handleInputChange}
                pattern="[0-9]{5}"
                required
              />
            </div>
          </div>

          <input type="submit" className="fadeIn fourth" value="Sign Up" />
        </form>

        <div id="formFooter">
          <div>{loginMessageElement}</div>
          <div className="auth-footer-link">
            <Link to="/login" className="underlineHover">
              Connectez-vous, si vous êtes un utilisateur existant
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

export default SignUpPage;
