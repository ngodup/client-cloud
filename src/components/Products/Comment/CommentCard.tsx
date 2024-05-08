import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../../utils/general";
import { Comment } from "../../../interfaces/comment";
import { FaRegEdit } from "react-icons/fa";
import { User } from "../../../interfaces/user";
import "./CommentCard.css";

interface CommentProps {
  comment: Comment;
  onEdit: (comment: Comment) => void;
  onDelete: (commentId: number) => void;
  user: User | undefined;
}

const CommentCard: React.FC<CommentProps> = ({
  comment,
  user,
  onDelete,
  onEdit,
}) => {
  const { content, createdAt, author, id } = comment;

  return (
    <div className="comment-wrapper">
      <div className="comment">
        <div className="comment-profile">
          <img src="/avatar.jpg" alt="Avatar" />
          <span className="comment-author">{author?.nom}</span>
        </div>
        <div className="comment-content">
          <div className="comment-text">{content}</div>
          <div className="comment-header">
            <span className="comment-date">{formatDate(createdAt)}</span>
            <span className="comment-user">
              Par {author?.nom} {author?.prenom}
            </span>
          </div>
        </div>
      </div>
      <div className="btn-icons">
        {user && user.id === author?.id && (
          <>
            <FaRegEdit color="blue" onClick={() => onEdit(comment)} />
            <RiDeleteBin6Line color="red" onClick={() => id && onDelete(id)} />
          </>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
