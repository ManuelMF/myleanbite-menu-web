import React, { useState } from "react";
import "../../styles/menu/submenu.css";
import { useMenu } from "../../context/MenuContext";

const SubMenu = () => {
  const { state, dispatch } = useMenu();
  const {
    selectedProduct,
    extrasProduct,
    ingredientsProduct,
    isEditingProduct,
  } = state;
  const { extras, ingredients } = selectedProduct; // this extras & ingredients comes from the Order sumary

  const [quantity, setQuantity] = useState(1);

  if (!state.isSubMenuOpen) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToOrder = () => {
    const extrasPrice = (extrasProduct || []).reduce(
      (acc, extra) => acc + extra.price * extra.quantity,
      0
    );
    const totalPrice = selectedProduct.price * quantity + extrasPrice;

    if (isEditingProduct) {
      dispatch({
        type: "UPDATE_PRODUCT_ORDER",
        payload: {
          selectedProduct,
          ingredients: ingredientsProduct,
          extras: extrasProduct,
          price: totalPrice,
        },
      });
    } else {
      dispatch({
        type: "ADD_TO_ORDER",
        payload: {
          selectedProduct,
          quantity,
          ingredients: ingredientsProduct,
          extras: extrasProduct,
        },
      });
    }

    dispatch({ type: "SHOW_NOTIFICATION", payload: totalPrice });

    setTimeout(() => dispatch({ type: "HIDE_NOTIFICATION" }), 1000);

    dispatch({ type: "CLOSE_SUBMENU" });
  };

  const extrasPrice =
    extrasProduct &&
    extrasProduct.reduce((act, extra) => act + extra.price * extra.quantity, 0);

  const isPersonifiedProduct = () => {
    return (
      ingredientsProduct?.some((ingredient) => ingredient.quantity === 0) ||
      extrasProduct?.some((extra) => extra.quantity > 0) ||
      extras?.some((extra) => extra.quantity > 0) || // this extras comes from the Order sumary
      ingredients?.some((extra) => extra.quantity > 0) || // this ingredients comes from the Order sumary
      false
    );
  };

  return (
    <div className="submenu">
      <div className="submenu-content">
        <h2 className="submenu-title">{selectedProduct.name}</h2>
        <p className="submenu-price">
          {(selectedProduct.price + extrasPrice).toFixed(2)} €
        </p>

        <button
          className="customize-btn"
          onClick={() => {
            dispatch({ type: "CUSTOMIZE_PRODUCT", payload: selectedProduct });
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
            disabled={isPersonifiedProduct()}
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
          {isEditingProduct ? "Guardar cambios" : "Añadir a la orden"}
        </button>
      </div>
    </div>
  );
};

export default SubMenu;
