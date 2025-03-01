import React from "react";
import "../../styles/menu/submenu.css";
import { useMenu } from "../../context/MenuContext";

const OrderSummary = () => {
  const { state } = useMenu();
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
  order.forEach(({ selectedProduct, quantity }) => {
    for (let i = 0; i < quantity; i++) {
      expandedOrder.push(selectedProduct.name);
    }
  });

  return (
    <div className="order-summary">
      <h2>Tu Pedido</h2>
      <ul>
        {expandedOrder.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <p>Total: {totalPrice.toFixed(2)} €</p>
      <button className="finish-btn">Finalizar Pedido</button>
    </div>
  );
};

export default OrderSummary;
