import React, { useContext, useEffect, useState } from "react";
import AuthContext, { AuthContextProps } from "../../context/AuthContext";
import {
  deleteAComment,
  getUserComments,
  updateComment,
} from "../../utils/userAPI";
import { Comment } from "../../interfaces/comment";
import "./Profile.css";
import CommentCard from "../../components/Products/Comment/CommentCard";
import AddComment from "../../components/Products/Comment/AddComment";

const ProfilePage = () => {
  const { userResponse, isAuthenticated } =
    useContext<AuthContextProps>(AuthContext);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

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

  const { userProfile, email } = userResponse.user;

  // CODE TO EDIT THE COMMENT ON A PRODUCT
  const editComment = (comment: Comment) => {
    setSelectedComment(comment);
  };

  const onUpdatedComment = async (content: string, commentId: number) => {
    //Call to api
    const token = localStorage.getItem("token"); // Or however you're storing the token
    if (!token) {
      return;
    }
    try {
      await updateComment(commentId, content, token);
      setUserComments(
        userComments.map((comment) =>
          comment.id === commentId ? { ...comment, content } : comment
        )
      );
      setSelectedComment(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error editing comment:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  // CODE TO DELETE THE COMMENT ON A PRODUCT
  const deleteComment = async (commentId: number) => {
    const token = localStorage.getItem("token"); // Or however you're storing the token
    if (!token) {
      return;
    }
    try {
      await deleteAComment(commentId, token);
      setUserComments(
        userComments.filter((comment) => comment.id !== commentId)
      );
      setSelectedComment(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting comment:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

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
          <button className="btn profile-edit-btn">Editer le profil</button>
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
        <h2>TOUS LES COMMENTAIRES</h2>
        {loading && <p>Loading comments...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && userComments.length > 0 && (
          <ul>
            {userComments.map((comment: Comment, index: number) => {
              const commentWithAuthor = {
                ...comment,
                author: {
                  id: userResponse.user.id,
                  email: email,
                  nom: userProfile.nom,
                  prenom: userProfile.prenom,
                },
              };

              return (
                <div key={index}>
                  <CommentCard
                    comment={commentWithAuthor}
                    user={userResponse.user}
                    onEdit={editComment}
                    onDelete={deleteComment}
                  />
                </div>
              );
            })}
          </ul>
        )}

        {selectedComment && (
          <div className="add-comment">
            <AddComment
              isCommentAdd={false}
              onEditComment={onUpdatedComment}
              comment={selectedComment}
              isAuthenticated={isAuthenticated}
            />
          </div>
        )}
        {!loading && !error && userComments.length === 0 && (
          <p>No comments found</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
