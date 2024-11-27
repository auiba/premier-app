import React, { useState, useRef, useCallback } from "react";

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = "Modal",
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Effect to open/close dialog based on isOpen prop
  React.useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      if (isOpen) {
        dialogElement.showModal();
      } else {
        dialogElement.close();
      }
    }
  }, [isOpen]);

  // Handle closing the modal
  const handleClose: React.ReactEventHandler<HTMLDialogElement> = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-gray-500 backdrop:opacity-50 p-6 rounded-lg shadow-xl"
      onClose={handleClose}
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {children}

        <button
          onClick={() => onClose()}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 self-end"
        >
          Cerrar
        </button>
      </div>
    </dialog>
  );
};
