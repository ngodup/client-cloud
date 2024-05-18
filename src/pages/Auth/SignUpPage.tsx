import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { ProfileFormState } from "../../components/ProfileForm/ProfileForm";
import { UserProfile } from "../../interfaces/user";

const SignUpPage = () => {
  const navigate = useNavigate();

  const registerUser = async (formData: UserProfile | ProfileFormState) => {
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
        toast.error("Registration failed. Please check the server response.");
      }
    } catch (error: any) {
      console.error("Error during registration: ", error);
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="form-signup-wrapper">
        <h2 className="active">ENREGISTREMENT D'UN NOUVEL UTILISATEUR</h2>
        <ProfileForm onSubmit={registerUser} />
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
