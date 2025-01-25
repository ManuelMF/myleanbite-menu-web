import React, { useState, useEffect } from "react";
import { useMenu } from "../../context/MenuContext";
import "../../styles/customizeMenu.css";

const CustomizeMenu = () => {
  const { state, dispatch } = useMenu();
  const { customizingItem, ingredientsItem, extrasItem } = state;

  if (!customizingItem) return null;

  // Calcular las listas iniciales de ingredientes y extras
  const ingredientsList =
    ingredientsItem ||
    customizingItem.ingredientsDTO?.map((ingredient, i) => ({
      ...ingredient,
      quantity: 1,
      key: i,
    })) ||
    [];

  const extrasList =
    extrasItem ||
    customizingItem.extrasDTO?.map((extra, i) => ({
      ...extra,
      quantity: 0,
      key: ingredientsList.length + i,
    })) ||
    [];

  // Inicializar el estado usando las listas calculadas
  const [ingredientQuantities, setIngredientQuantities] =
    useState(ingredientsList);
  const [extrasQuantities, setExtrasQuantities] = useState(extrasList);

  // Función para manejar cambios en las cantidades
  const handleQuantityChange = (items, setItems, itemId, action) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === itemId
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 0),
            }
          : item
      )
    );
  };

  const handleSaveCustomization = (ingredients, extras) => {
    dispatch({ type: "SAVE_CUSTOMIZATION", payload: { ingredients, extras } });
  };

  const handleCancelCustomization = () => {
    dispatch({ type: "CANCEL_CUSTOMIZATION" });
  };

  return (
    <div className="customize-menu">
      <div className="customize-content">
        <h2 className="customize-title">Personaliza {customizingItem.name}</h2>

        <div className="ingredients-list">
          {ingredientQuantities.map((ingredient) => (
            <div key={ingredient.key} className="ingredient-item">
              <span>{ingredient.name}</span>
              <div className="ingredient-controls">
                <button
                  className="control-btn"
                  disabled={ingredient.quantity === 0}
                  onClick={() =>
                    handleQuantityChange(
                      ingredientQuantities,
                      setIngredientQuantities,
                      ingredient.productId,
                      "decrease"
                    )
                  }
                >
                  -
                </button>
                <span className="quantity">{ingredient.quantity}</span>
                <button
                  className="control-btn"
                  disabled={ingredient.quantity === 1}
                  onClick={() =>
                    handleQuantityChange(
                      ingredientQuantities,
                      setIngredientQuantities,
                      ingredient.productId,
                      "increase"
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
          {extrasQuantities.map((extra) => (
            <div key={extra.key} className="ingredient-item">
              <span>
                {extra.name} ({extra.price} €)
              </span>
              <div className="ingredient-controls">
                <button
                  className="control-btn"
                  disabled={extra.quantity === 0}
                  onClick={() =>
                    handleQuantityChange(
                      extrasQuantities,
                      setExtrasQuantities,
                      extra.productId,
                      "decrease"
                    )
                  }
                >
                  -
                </button>
                <span className="quantity">{extra.quantity}</span>
                <button
                  className="control-btn"
                  onClick={() =>
                    handleQuantityChange(
                      extrasQuantities,
                      setExtrasQuantities,
                      extra.productId,
                      "increase"
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="submenu-footer">
          <button className="cancel-btn" onClick={handleCancelCustomization}>
            Cancelar
          </button>
          <button
            className="add-btn"
            onClick={() =>
              handleSaveCustomization(ingredientQuantities, extrasQuantities)
            }
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeMenu;
