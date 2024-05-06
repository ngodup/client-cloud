import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
  const formRef = useRef<HTMLFormElement>(null);
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

  const [profileImage, setProfileImage] = useState<File | undefined>();
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

    if (formRef.current) {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);
      formData.append("prenom", prenom);
      formData.append("nom", nom);

      if (dateDeNaissance) {
        formData.append("dateDeNaissance", dateDeNaissance);
      }

      if (phoneNumber) {
        formData.append("phoneNumber", phoneNumber);
      }

      if (address) {
        formData.append("address", address);
      }

      if (ville) {
        formData.append("ville", ville);
      }

      if (codePostal) {
        formData.append("codePostal", codePostal);
      }

      if (profileImage) {
        formData.append("photoDeProfil", profileImage);
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201 || response.status === 200) {
          toast.success("Registration successful!");
        } else {
          // Handle non-200/201 responses explicitly
          toast.error("Registration failed. Please check the server response.");
        }
      } catch (error: any) {
        console.error("Error during registration: ", error);
        toast.error(error.response?.data?.message || "Registration failed.");
      } finally {
        // Reset the form fields using the formRef ref
        const form = formRef.current;
        if (form) {
          form.reset();
        }
      }
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

  const handleOnProfilePictureChange = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setProfileImage(target.files[0]);
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="form-signup-wrapper">
        <h2 className="active">Registration for a new User</h2>

        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="row">
            <div className="field-container">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                className="fadeIn second"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field-container">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                className="fadeIn third"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="field-container">
            <label htmlFor="photoDeProfil">Profile Picture</label>
            <input
              type="file"
              className="fadeIn second"
              name="photoDeProfil"
              accept="image/*"
              onChange={handleOnProfilePictureChange}
            />
          </div>
          <div className="row">
            <div className="field-container">
              <label htmlFor="prenom">First Name*</label>
              <input
                type="text"
                className="fadeIn second"
                name="prenom"
                placeholder="First Name"
                value={prenom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field-container">
              <label htmlFor="nom">Last Name*</label>
              <input
                type="text"
                className="fadeIn second"
                name="nom"
                placeholder="Last Name"
                value={nom}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="field-container">
              <label htmlFor="dateDeNaissance">Date of Birth</label>
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
              <label htmlFor="ville">City</label>
              <input
                type="text"
                className="fadeIn second"
                name="ville"
                placeholder="City"
                value={ville}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-container">
              <label htmlFor="codePostal">Postal Code</label>
              <input
                type="text"
                className="fadeIn second"
                name="codePostal"
                placeholder="Postal Code"
                value={codePostal}
                onChange={handleInputChange}
                pattern="[0-9]{5}"
                required
              />
            </div>
          </div>

          <input type="submit" className="fadeIn fourth" value="Sign Up" />
        </form>
        <div>
          {" "}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>

        <div id="formFooter">
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
