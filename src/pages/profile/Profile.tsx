import React, { useContext } from "react";
import AuthContext, { AuthContextProps } from "../../context/AuthContext";
import "./Profile.css";

const ProfilePage = () => {
  const { userResponse } = useContext<AuthContextProps>(AuthContext);

  if (!userResponse) {
    return <div>No user profile found</div>;
  }

  const { userProfile } = userResponse.user;

  if (!userProfile) {
    return <div>No user profile found</div>;
  }

  return (
    <div className="container">
      <div className="profile">
        <div className="profile-image">
          <img src="/avatar.jpg" alt="Avatar" id="icon" />
        </div>
        <div className="profile-user-settings">
          <h1 className="profile-user-name">
            {userProfile.prenom} {userProfile.nom}
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
              {userProfile.phoneNumber}
            </li>
            <li>
              <span className="profile-stat-count">Address</span>{" "}
              {userProfile.address}
            </li>
            <li>
              <span className="profile-stat-count">Ville</span>{" "}
              {userProfile.ville}
            </li>
            <li>
              <span className="profile-stat-count">Code Postal</span>{" "}
              {userProfile.codePostal}
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
