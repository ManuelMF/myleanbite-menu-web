import React, { useState } from "react";
import "../../styles/menu/submenu.css";
import { useMenu } from "../../context/MenuContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";

const OrderSummary = () => {
  const { state, dispatch, actions } = useMenu();
  const { order } = state;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = order.reduce(
    (total, { selectedProduct, extras, quantity }) => {
      const extrasTotal = extras
        ? extras.reduce((sum, extra) => sum + extra.price * extra.quantity, 0)
        : 0;
      return total + selectedProduct.price * quantity + extrasTotal;
    },
    0
  );

  const expandedOrder = [];
  order.forEach(
    ({ selectedProduct, ingredients = [], extras = [], quantity }) => {
      for (let i = 0; i < quantity; i++) {
        expandedOrder.push({ ...selectedProduct, ingredients, extras });
      }
    }
  );

  const handleOpenSubmenu = (product) => {
    dispatch({ type: "SET_SELECTED_PRODUCT_TO_EDIT", payload: product });
  };

  const handleRemoveProduct = (product) => {
    actions.removeFromOrder(product);
  };

  // Función para finalizar el pedido, abre el modal de confirmación
  const handleFinishOrder = () => {
    if (order.length) setIsModalOpen(true);
  };

  const handleConfirmFinishOrder = () => {
    // Lógica para finalizar el pedido (por ejemplo, llamada a la API)
    console.log("Pedido finalizado");
    setIsModalOpen(false);
  };

  const handleCancelFinishOrder = () => {
    setIsModalOpen(false); // Cerrar el modal si el usuario cancela
  };

  return (
    <div className="order-summary">
      <h2 className="section-title">Tu Pedido</h2>
      <ul>
        {expandedOrder.map((product, index) => (
          <li key={index} className="order-item">
            <span
              className="editable-text"
              onClick={() => handleOpenSubmenu(product)}
            >
              {product.name}
            </span>
            <div className="order-actions">
              <button
                className="icon-btn"
                onClick={() => handleOpenSubmenu(product)}
              >
                <FaEdit />
              </button>
              <button
                className="icon-btn"
                onClick={() => handleRemoveProduct(product)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total: {totalPrice.toFixed(2)} €</p>
      <button className="finish-btn" onClick={handleFinishOrder}>
        Finalizar Pedido
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelFinishOrder}
        onConfirm={handleConfirmFinishOrder}
      />
    </div>
  );
};

export default OrderSummary;
