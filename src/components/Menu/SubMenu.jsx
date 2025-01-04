import React, { useState } from "react";
import './../../styles/globals.css';

const SubMenu = ({ item, onClose, onCustomize, onAddToOrder }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="submenu">
      <div className="submenu-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2 className="item-name">{item.name}</h2>
        <p className="item-price">${item.price.toFixed(2)}</p>

        <div className="quantity-controls">
          <button
            className={`control-btn decrease-btn ${quantity === 1 ? 'disabled' : ''}`}
            onClick={handleDecrease}
            disabled={quantity === 1}
          >
            -
          </button>
          <div className="quantity-display">{quantity}</div>
          <button className="control-btn increase-btn" onClick={handleIncrease}>
            +
          </button>
        </div>

        <button className="customize-btn" onClick={onCustomize}>Personalizar</button>

        <div className="action-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button
            className="add-btn"
            onClick={() => onAddToOrder(item, quantity)}
          >
            Añadir a la orden
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
