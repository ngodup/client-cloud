import React, { useContext } from "react";
import "./Profile.css";
import AuthContext, { AuthContextProps } from "../../context/AuthContext";
import { UserProfile } from "../../interfaces/user";

const ProfilePage = () => {
  const { user } = useContext<AuthContextProps>(AuthContext);
  debugger;

  if (!user) {
    return <div>Loading...</div>;
  }

  const { userProfile } = user;

  const userData: UserProfile = userProfile ?? {
    prenom: "",
    nom: "",
    phoneNumber: "",
    address: "",
    ville: "",
    codePostal: "",
  };

  return (
    <div className="container">
      <div className="profile">
        <div className="profile-image">
          <img src="/avatar.jpg" alt="Avatar" id="icon" />
        </div>
        <div className="profile-user-settings">
          <h1 className="profile-user-name">
            {userData.prenom} {userData.nom}
          </h1>
          <button className="btn profile-edit-btn">Edit Profile</button>
          <button
            className="btn profile-settings-btn"
            aria-label="profile settings"
          >
            <i className="fas fa-cog" aria-hidden="true"></i>
          </button>
        </div>
        <div className="profile-stats">
          <ul>
            <li>
              <span className="profile-stat-count">Phone Number : </span>{" "}
              {userData.phoneNumber}
            </li>
            <li>
              <span className="profile-stat-count">Address</span>{" "}
              {userData.address}
            </li>
            <li>
              <span className="profile-stat-count">Ville</span> {userData.ville}
            </li>
            <li>
              <span className="profile-stat-count">Code Postal</span>{" "}
              {userData.codePostal}
            </li>
          </ul>
        </div>
        <div className="profile-bio">
          <p>
            <span className="profile-real-name">Tenzin </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
