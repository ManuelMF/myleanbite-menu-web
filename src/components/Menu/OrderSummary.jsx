import React from "react";
import "../../styles/submenu.css";

const OrderSummary = ({ order }) => {
  const totalPrice = order.reduce(
    (total, { item, ingredients, extras }) =>
      total +
      item.price +
      ingredients.reduce((sum, ing) => sum + ing.price * ing.quantity, 0) +
      extras.reduce((sum, extra) => sum + extra.price, 0),
    0
  );

  return (
    <div className="order-summary">
      <h2>Tu Pedido</h2>
      <ul>
        {order.map(({ item }, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <p>Total: {totalPrice.toFixed(2)} €</p>
      <button className="finish-btn">Finalizar Pedido</button>
    </div>
  );
};

export default OrderSummary;
