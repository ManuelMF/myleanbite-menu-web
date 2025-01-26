import React, { useState } from "react";
import "../../styles/menu/submenu.css";
import { useMenu } from "../../context/MenuContext";

const SubMenu = () => {
  const { state, dispatch } = useMenu();
  const { selectedItem, extrasItem, ingredientsItem } = state;
  const [quantity, setQuantity] = useState(1);

  if (!state.isSubMenuOpen) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToOrder = () => {
    const extrasPrice = (extrasItem || []).reduce(
      (acc, extra) => acc + extra.price * extra.quantity,
      0
    );
    const totalPrice = selectedItem.price * quantity + extrasPrice;

    dispatch({
      type: "ADD_TO_ORDER",
      payload: {
        selectedItem,
        quantity,
        ingredients: ingredientsItem,
        extras: extrasItem,
      },
    });

    dispatch({ type: "SHOW_NOTIFICATION", payload: totalPrice });

    setTimeout(() => dispatch({ type: "HIDE_NOTIFICATION" }), 1000);

    dispatch({ type: "CLOSE_SUBMENU" });
  };

  const extrasPrice =
    extrasItem &&
    extrasItem.reduce((act, extra) => act + extra.price * extra.quantity, 0);

  const isPersonifiedItem = () => {
    return (
      ingredientsItem?.some((ingredient) => ingredient.quantity === 0) ||
      extrasItem?.some((extra) => extra.quantity > 0) ||
      false
    );
  };

  return (
    <div className="submenu">
      <div className="submenu-content">
        <h2 className="submenu-title">{selectedItem.name}</h2>
        <p className="submenu-price">
          {(selectedItem.price + extrasPrice).toFixed(2)} €
        </p>

        <button
          className="customize-btn"
          onClick={() => {
            dispatch({ type: "CUSTOMIZE_ITEM", payload: selectedItem });
          }}
        >
          Personalizar
        </button>

        <div className="quantity-controls">
          <button
            className="control-btn"
            onClick={handleDecrease}
            disabled={quantity === 1}
          >
            -
          </button>
          <div className="quantity-display">{quantity}</div>
          <button
            className="control-btn"
            onClick={handleIncrease}
            disabled={isPersonifiedItem()}
          >
            +
          </button>
        </div>
      </div>

      <div className="submenu-footer">
        <button
          className="cancel-btn"
          onClick={() => dispatch({ type: "CLOSE_SUBMENU" })}
        >
          Cancelar
        </button>
        <button className="add-btn" onClick={handleAddToOrder}>
          Añadir a la orden
        </button>
      </div>
    </div>
  );
};

export default SubMenu;
