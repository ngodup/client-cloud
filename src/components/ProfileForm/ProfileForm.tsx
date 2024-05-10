import React, { useState, useRef, useEffect } from "react";
import { UserProfile } from "../../interfaces/user";
import "./ProfileForm.css";

export interface ProfileFormState extends UserProfile {
  email: string;
  password: string;
}

interface ProfileFormProps {
  initialValues?: UserProfile;
  onSubmit: (values: UserProfile | ProfileFormState) => void;
  isEditMode?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialValues,
  onSubmit,
  isEditMode = false,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<UserProfile>({
    prenom: "",
    nom: "",
    dateDeNaissance: new Date(),
    phoneNumber: "",
    address: "",
    ville: "",
    codePostal: "",
    photoDeProfil: "",
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | undefined>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const {
    prenom,
    nom,
    dateDeNaissance,
    phoneNumber,
    address,
    ville,
    codePostal,
  } = state;

  useEffect(() => {
    if (initialValues) {
      setState({
        prenom: initialValues.prenom,
        nom: initialValues.nom,
        dateDeNaissance: initialValues.dateDeNaissance
          ? new Date(initialValues.dateDeNaissance)
          : new Date(),
        phoneNumber: initialValues.phoneNumber,
        address: initialValues.address,
        ville: initialValues.ville,
        codePostal: initialValues.codePostal,
      });
    }
  }, [initialValues]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData();

      if (!isEditMode) {
        formData.append("email", email);
        formData.append("password", password);
      }

      formData.append("prenom", prenom);
      formData.append("nom", nom);
      if (dateDeNaissance) {
        const date =
          dateDeNaissance instanceof Date
            ? dateDeNaissance
            : new Date(dateDeNaissance);
        formData.append("dateDeNaissance", date.toISOString().split("T")[0]);
      }
      formData.append("phoneNumber", phoneNumber || "");
      formData.append("address", address || "");
      formData.append("ville", ville || "");
      formData.append("codePostal", codePostal || "");

      if (profileImage) {
        formData.append("photoDeProfil", profileImage);
      }

      const profileInfo: UserProfile = {
        prenom: formData.get("prenom") as string,
        nom: formData.get("nom") as string,
        dateDeNaissance: new Date(formData.get("dateDeNaissance") as string),
        phoneNumber: formData.get("phoneNumber") as string,
        address: formData.get("address") as string,
        ville: formData.get("ville") as string,
        codePostal: formData.get("codePostal") as string,
        photoDeProfil: formData.get("photoDeProfil") as File,
      };

      if (initialValues) {
        onSubmit(profileInfo);
      } else {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const newUser: ProfileFormState = {
          ...profileInfo,
          email,
          password,
        };
        onSubmit(newUser);
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

    if (target.files && target.files[0]) {
      setProfileImage(target.files[0]);
      setSelectedImage(URL.createObjectURL(target.files[0]));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="two-column-row">
          <div className="column-left">
            {!isEditMode && (
              <>
                <div className="field-container">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    className="fadeIn second"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
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

          <div className="colomn-right">
            <label htmlFor="photoDeProfil">Profile Picture</label>
            <div className="fadeIn first">
              {selectedImage ? (
                <img src={selectedImage} alt="Avatar" id="profile-picture" />
              ) : (
                <img
                  src={
                    initialValues?.photoDeProfil
                      ? `http://127.0.0.1:8000/images/profiles/${initialValues.photoDeProfil}`
                      : "./default-profile.webp"
                  }
                  alt="Avatar"
                  id="profile-picture"
                />
              )}
            </div>
            <div className="field-container">
              <input
                type="file"
                className="fadeIn second"
                name="photoDeProfil"
                accept="image/*"
                onChange={handleOnProfilePictureChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="field-container">
            <label htmlFor="dateDeNaissance">Date of Birth</label>
            <input
              type="date"
              className="fadeIn second"
              name="dateDeNaissance"
              value={
                (dateDeNaissance instanceof Date
                  ? dateDeNaissance
                  : new Date(dateDeNaissance)
                )
                  .toISOString()
                  .split("T")[0]
              }
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
    </>
  );
};

export default ProfileForm;
