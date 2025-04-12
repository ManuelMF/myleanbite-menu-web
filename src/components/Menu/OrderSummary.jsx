import React, { useState } from "react";
import "../../styles/menu/submenu.css";
import { useMenu } from "../../context/MenuContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";
import { useParams } from "react-router-dom";
import { mapToOrderDTO } from "../../services/orderMapper";

const OrderSummary = () => {
  const { state, dispatch, actions } = useMenu();
  const { order } = state;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { tableNumberId, restaurantId } = useParams();

  const totalAmount = order.reduce(
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

  const handleFinishOrder = () => {
    if (order.length) setIsModalOpen(true);
  };

  const handleConfirmFinishOrder = () => {
    actions.finalizeOrder({
      restaurantId,
      tableNumberId,
      order: mapToOrderDTO({
        tableNumberId,
        order,
        totalAmount,
      }),
    });

    dispatch({ type: "SHOW_NOTIFICATION_PUSH_ORDER" });

    setTimeout(() => dispatch({ type: "HIDE_NOTIFICATION_PUSH_ORDER" }), 3000);

    setIsModalOpen(false);
  };

  const handleCancelFinishOrder = () => {
    setIsModalOpen(false);
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
      <p>Total: {totalAmount.toFixed(2)} €</p>
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
