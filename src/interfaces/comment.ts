export interface Comment {
  id?: number;
  content: string;
  createdAt: Date;
  author?: {
    id: number;
    nom: string;
    prenom: string;
  };
}

// export interface  {
//   comments: Comment[];
//   // page?: number;
//   // limit?: number;
//   // total?: number;
// }

// export interface CommentResponse {
//   id?: number;
//   content: string;
//   createdAt: Date;
//   author?: {
//     id: number;
//     email: string;
//     nom: string;
//     prenom: string;
//   };
// }

export interface ProductCommentResponse {
  comments: Comment[];
}
