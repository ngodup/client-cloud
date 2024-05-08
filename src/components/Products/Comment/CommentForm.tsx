import React, { useState, useEffect } from "react";
import { Comment } from "../../../interfaces/comment";
import "./CommentForm.css";

type CommentFormProps = {
  onAddComment?: (content: string, productId: number) => void;
  onEditComment?: (content: string, commentId: number) => void;
  productId?: number | undefined;
  comment?: Comment | undefined;
  isCommentAdd: boolean;
  isAuthenticated: boolean;
};

const CommentForm: React.FC<CommentFormProps> = ({
  onAddComment,
  onEditComment,
  isCommentAdd,
  productId,
  comment,
  isAuthenticated,
}) => {
  const [content, setContent] = useState(comment ? comment.content : "");

  useEffect(() => {
    if (comment) {
      setContent(comment.content);
    } else {
      setContent("");
    }
  }, [comment]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;

    if (isCommentAdd && onAddComment && productId) {
      onAddComment(content, productId);
    } else if (onEditComment && comment && typeof comment.id === "number") {
      onEditComment(content, comment.id);
    }

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-comment">
      <div>
        <label htmlFor="comment">
          {" "}
          {isCommentAdd
            ? "Ajouter un commentaire"
            : "Mettre à jour le commentaire"}{" "}
        </label>
        <textarea
          className="comment"
          name={content}
          value={content}
          rows={4}
          placeholder={content}
          disabled={!isAuthenticated}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit" className="btn" disabled={!isAuthenticated}>
        Soumettre
      </button>
    </form>
  );
};

export default CommentForm;
