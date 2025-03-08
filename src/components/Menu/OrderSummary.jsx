import React from "react";
import "../../styles/menu/submenu.css";
import { useMenu } from "../../context/MenuContext";

const OrderSummary = () => {
  const { state, dispatch } = useMenu();

  const { order } = state;

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

  return (
    <div className="order-summary">
      <h2 className="section-title">Tu Pedido</h2>
      <ul>
        {expandedOrder.map((product, index) => (
          <li key={index} onClick={() => handleOpenSubmenu(product)}>
            {product.name}
          </li>
        ))}
      </ul>
      <p>Total: {totalPrice.toFixed(2)} €</p>
      <button className="finish-btn">Finalizar Pedido</button>
    </div>
  );
};

export default OrderSummary;
