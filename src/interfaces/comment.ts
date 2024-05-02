export interface Comment {
  id?: number;
  content: string;
  createdAt: Date;
  author?: string;
  prenom?: string;
}

export interface CommentResponse {
  comments: Comment[];
  // page?: number;
  // limit?: number;
  // total?: number;
}
