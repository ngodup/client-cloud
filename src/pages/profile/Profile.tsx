import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";
import AuthContext, { AuthContextProps } from "../../context/AuthContext";
import {
  deleteAComment,
  getUserComments,
  updateComment,
  editProfile,
  getUserOrders,
} from "../../utils/userAPI";
import CommentCard from "../../components/Products/Comment/CommentCard";
import CommentForm from "../../components/Products/Comment/CommentForm";
import CustomModal from "../../components/shared/CustomModal/CustomModal";
import { Comment } from "../../interfaces/comment";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { UserProfile } from "../../interfaces/user";
import "./Profile.css";
import { formatDate, formatPrice } from "../../utils/general";
import { ShoppingCartState } from "../../interfaces/shoppingCart";

const ProfilePage = () => {
  const { userResponse, isAuthenticated, updateUserResponse } =
    useContext<AuthContextProps>(AuthContext);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const [orderHistory, setOrderHistory] = useState<ShoppingCartState[]>([]);

  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (!userResponse || !userResponse.user.userProfile) {
      return;
    }

    const fetchUserOrders = async () => {
      try {
        if (userToken) {
          const response = await getUserOrders(userToken);
          setOrderHistory(response);
        }
      } catch (error) {
        setError("Error fetching user comments");
      } finally {
        setLoading(false);
      }
    };

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

    fetchUserOrders();
    fetchUserComments();
  }, [userToken, userResponse]);

  if (!userResponse || !userResponse.user.userProfile) {
    return <div>No user profile found</div>;
  }

  const { userProfile, email } = userResponse.user;
  const profileId = userProfile.id as number;

  const userInfo: UserProfile = {
    prenom: userProfile.prenom,
    nom: userProfile.nom,
    dateDeNaissance: userProfile.dateDeNaissance
      ? new Date(userProfile.dateDeNaissance)
      : new Date(),
    phoneNumber: userProfile.phoneNumber,
    address: userProfile.address,
    ville: userProfile.ville,
    codePostal: userProfile.codePostal, // Need to convert to string at server
    photoDeProfil: userProfile.photoDeProfil,
  };

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
      toast.success("Mise à jour du profil réussie");
      setSelectedComment(null);
    } catch (error) {
      toast.error(
        "Une erreur s'est produite lors de la mise à jour de votre profil. Veuillez réessayer de saisir vos informations"
      );
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

  const updateProfile = async (formData: UserProfile) => {
    const token = localStorage.getItem("token"); // Or however you're storing the token
    if (!token) {
      return;
    } else {
      try {
        const response = await editProfile(profileId, formData, token);
        // Update userResponse state in AuthContext
        setIsModalOpen(false);
        updateUserResponse({
          user: {
            ...userResponse.user,
            userProfile: response,
          },
        });
      } catch (error) {}
    }
  };

  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-image">
          {userProfile.photoDeProfil ? (
            <img
              src={`http://127.0.0.1:8000/images/profiles/${userProfile.photoDeProfil}`}
              alt="Avatar"
              id="icon"
            />
          ) : (
            <img src="./default-profile.webp" alt="Avatar" id="icon" />
          )}
        </div>
        <div className="profile-user-settings">
          <h1 className="profile-user-name">
            {userProfile.prenom} {userProfile.nom}
          </h1>
          <button
            className="btn profile-edit-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Modifier le profil
          </button>
        </div>
        <div className="profile-stats">
          <ul>
            <li>
              <span className="profile-stat-count">Numéro de téléphone : </span>{" "}
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
      <div className="user-orders">
        <h2>Historique des commandes</h2>
        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Prix</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order: any) => (
              <>
                <tr style={{ backgroundColor: "#ecebeb", fontWeight: "bold" }}>
                  <td>Order Date: {formatDate(order.createdAt)}</td>
                  <td>
                    Status : {order.status} Payment : {order.paymentMethod}
                  </td>
                  <td>Total: {formatPrice(order.totalPrice)}</td>
                </tr>
                {order.products.map((product: any) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-info">
                        {product.imageName && (
                          <img
                            className="product-image"
                            src={`http://127.0.0.1:8000/images/products/${product.imageName}`}
                            alt={product.name}
                          />
                        )}

                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>{formatPrice(product.price)}</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => console.log("delete")}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="user-comments">
        <h2>Historique des commentaires</h2>
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
            <CommentForm
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
      {isModalOpen && (
        <CustomModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
          <IoMdCloseCircle
            className="close-modal-icon"
            onClick={() => setIsModalOpen(false)}
          />
          <ProfileForm
            onSubmit={updateProfile}
            initialValues={userInfo}
            isEditMode={true}
          />
        </CustomModal>
      )}

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
  );
};

export default ProfilePage;
