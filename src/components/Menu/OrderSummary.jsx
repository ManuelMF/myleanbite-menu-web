import React from "react";
import "../../styles/submenu.css";

const OrderSummary = ({ order }) => {
  const totalPrice = order.reduce((total, { item, extrasItem, quantity }) => {
    const extrasTotal = extrasItem
      ? extrasItem.reduce((sum, extra) => sum + extra.price * extra.quantity, 0)
      : 0;
    return total + item.price * quantity + extrasTotal;
  }, 0);

  const expandedOrder = [];
  order.forEach(({ item, quantity }) => {
    for (let i = 0; i < quantity; i++) {
      expandedOrder.push(item.name);
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
