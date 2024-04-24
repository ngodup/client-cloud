import React, { ReactNode, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./CustomModal.css";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClose = (event: any) => {
      event.preventDefault();
      onClose();
    };

    const modalContent = (
      <div className="modal" ref={modalRef}>
        <div className="modal-content">{children}</div>
      </div>
    );

    modalRootRef.current = document.createElement("div");
    document.body.appendChild(modalRootRef.current);
    const root = createRoot(modalRootRef.current);
    root.render(modalContent);

    const handleOutsideClick = (event: any) => {
      if (event.target === modalRef.current) {
        handleClose(event);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose(event);
      }
    };

    modalRef.current?.addEventListener("click", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      modalRef.current?.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
      if (modalRootRef.current) {
        document.body.removeChild(modalRootRef.current);
      }
    };
  }, [isOpen, onClose, children]);

  return null;
};

export default CustomModal;
