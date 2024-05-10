interface Role {
  name: string;
}

export interface UserProfile {
  id?: number;
  prenom: string;
  nom: string;
  phoneNumber?: string;
  address?: string;
  dateDeNaissance: Date;
  ville?: string;
  codePostal?: string;
  photoDeProfil?: File | string;
}

export interface User {
  id: number;
  email: string;
  roles?: Role[];
  userProfile?: UserProfile;
}

export interface UserResponse {
  user: User;
}
