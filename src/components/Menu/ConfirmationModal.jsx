import React from "react";
import "../../styles/menu/confirmationModal.css";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h3>¿Estás seguro de que quieres finalizar el pedido?</h3>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
