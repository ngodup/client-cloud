interface Role {
  name: string;
}

export interface UserProfile {
  id: number;
  prenom: string;
  nom: string;
  phoneNumber?: string;
  address?: string;
  dateDeNaissance?: Date;
  ville?: string;
  codePostal?: number;
  photoDeProfil?: string;
}

export interface User {
  id?: number | null;
  email: string;
  roles?: Role[];
  userInfo?: UserProfile;
}
