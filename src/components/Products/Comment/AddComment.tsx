import React, { useState } from "react";
import "./AddComment.css";

type AddCommentProps = {
  onAddComment: (comment: string, productId: number) => void;
  productId: number | undefined;
  isAuthenticated: boolean;
};

const AddComment: React.FC<AddCommentProps> = ({
  onAddComment,
  productId,
  isAuthenticated,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content || !productId) return;
    onAddComment(content, productId);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-comment">
      <div>
        <label htmlFor="comment">Ajouter un commentaire : </label>
        <textarea
          className="comment"
          rows={4}
          value={content}
          disabled={!isAuthenticated}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit" className="btn" disabled={!isAuthenticated}>
        Ajouter un commentaire
      </button>
    </form>
  );
};

export default AddComment;
