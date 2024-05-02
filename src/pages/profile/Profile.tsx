import React, { useContext, useEffect, useState } from "react";
import AuthContext, { AuthContextProps } from "../../context/AuthContext";
import { getUserComments } from "../../utils/userAPI";
import { Comment } from "../../interfaces/comment";
import "./Profile.css";
import CommentCard from "../../components/Products/Comment/CommentCard";

const ProfilePage = () => {
  const { userResponse } = useContext<AuthContextProps>(AuthContext);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (!userResponse || !userResponse.user.userProfile) {
      return;
    }

    const { email } = userResponse.user;

    const fetchUserComments = async () => {
      setLoading(true);
      setError(null);

      try {
        if (userToken) {
          const response = await getUserComments(userToken, email);
          setUserComments(response);
        }
      } catch (error) {
        setError("Error fetching user comments");
      } finally {
        setLoading(false);
      }
    };

    fetchUserComments();
  }, [userToken, userResponse]);

  if (!userResponse || !userResponse.user.userProfile) {
    return <div>No user profile found</div>;
  }

  const { userProfile } = userResponse.user;

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
      </div>
      <div className="user-comments">
        <h2>All Comments</h2>
        {loading && <p>Loading comments...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && userComments.length > 0 && (
          <ul>
            {userComments.map((comment: Comment, index: number) => {
              const commentWithAuthor = {
                ...comment,
                author: userProfile.nom,
                prenom: userProfile.prenom,
              };

              return (
                <div key={index}>
                  <CommentCard comment={commentWithAuthor} />
                </div>
              );
            })}
          </ul>
        )}
        {!loading && !error && userComments.length === 0 && (
          <p>No comments found</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
