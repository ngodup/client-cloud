import React, { useState } from "react";
import "./Auth.css";

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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          prenom,
          nom,
          dateDeNaissance,
          phoneNumber,
          address,
          ville,
          codePostal,
        }),
      });

      if (response.ok) {
        console.log("Login successful!");
      } else {
        console.error("Login failed: ", await response.text());
      }
    } catch (error) {
      console.error("Error during login: ", error);
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
      </div>
    </div>
  );
};

export default SignUpPage;
