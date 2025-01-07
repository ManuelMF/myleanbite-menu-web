import React, { useState } from "react";
import "../../styles/customizeMenu.css";

const CustomizeMenu = ({ item, onClose, onSave }) => {
  const itemList =
    item.ingredientsDTO?.map((ingredient, i) => ({
      ...ingredient,
      quantity: 1,
      key: i,
    })) || [];

  const extrasList =
    item.extrasDTO?.map((extra, i) => ({
      ...extra,
      quantity: 0,
      key: (itemList.length || 0) + i,
    })) || [];

  const [ingredientQuantities, setIngredientQuantities] = useState(itemList);
  const [extrasQuantities, setExtrasQuantities] = useState(extrasList);

  const handleIngredientChange = (ingredientId, action) => {
    setIngredientQuantities((prev) =>
      prev.map((ingredient) =>
        ingredient.productId === ingredientId
          ? {
              ...ingredient,
              quantity:
                action === "increase"
                  ? ingredient.quantity + 1
                  : ingredient.quantity > 0
                  ? ingredient.quantity - 1
                  : 0,
            }
          : ingredient
      )
    );
  };
  const handleExtraChange = (extraId, action) => {
    setExtrasQuantities((prev) =>
      prev.map((extra) =>
        extra.productId === extraId
          ? {
              ...extra,
              quantity:
                action === "increase"
                  ? extra.quantity + 1
                  : extra.quantity > 0
                  ? extra.quantity - 1
                  : 0,
            }
          : extra
      )
    );
  };

  return (
    <div className="customize-menu">
      <div className="customize-content">
        <h2 className="customize-title">Personaliza {item.name}</h2>

        <div className="ingredients-list">
          {ingredientQuantities.map((ingredient) => (
            <div key={ingredient.key} className="ingredient-item">
              <span>{ingredient.name}</span>
              <div className="ingredient-controls">
                <button
                  className="control-btn"
                  disabled={ingredient.quantity == 0}
                  onClick={() =>
                    handleIngredientChange(ingredient.productId, "decrease")
                  }
                >
                  -
                </button>
                <span className="quantity">{ingredient.quantity}</span>
                <button
                  disabled={ingredient.quantity == 1}
                  className="control-btn"
                  onClick={() =>
                    handleIngredientChange(ingredient.productId, "increase")
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
          {extrasQuantities.map((extra) => (
            <div key={extra.key} className="ingredient-item">
              <span>{extra.name + " (" + extra.price + " €)"}</span>
              <div className="ingredient-controls">
                <button
                  className="control-btn"
                  disabled={extra.quantity == 0}
                  onClick={() => handleExtraChange(extra.productId, "decrease")}
                >
                  -
                </button>
                <span className="quantity">{extra.quantity}</span>
                <button
                  className="control-btn"
                  onClick={() => handleExtraChange(extra.productId, "increase")}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <br />
        <div className="submenu-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="add-btn"
            onClick={() => onSave(ingredientQuantities)}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeMenu;
