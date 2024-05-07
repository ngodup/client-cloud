import React from "react";
import { formatDate } from "../../../utils/general";
import { CommentResponse } from "../../../interfaces/comment";
import "./CommentCard.css";

interface CommentProps {
  comment: CommentResponse;
}

const CommentCard: React.FC<CommentProps> = ({ comment }) => {
  const { content, createdAt, author } = comment;

  return (
    <div className="comment">
      <div className="comment-profile">
        <img src="/avatar.jpg" alt="Avatar" />
        <span className="comment-author">{author?.nom}</span>
      </div>
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-date">{formatDate(createdAt)}</span>

          <span className="comment-user">
            Par {author?.nom} {author?.prenom}
          </span>
        </div>
        <div className="comment-text">{content}</div>
      </div>
    </div>
  );
};

export default CommentCard;
