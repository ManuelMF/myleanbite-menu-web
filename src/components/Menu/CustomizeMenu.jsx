import React, { useState } from "react";
import '../../styles/submenu.css';

const CustomizeMenu = ({ item, onClose, onSave }) => {
  const [ingredientQuantities, setIngredientQuantities] = useState(
    item.ingredientsDTO.map((ingredient) => ({
      ...ingredient,
      quantity: 0,
    }))
  );

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

  return (
    <div className="customize-menu">
      <div className="customize-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2 className="customize-title">Personaliza {item.name}</h2>

        <div className="ingredients-list">
          {ingredientQuantities.map((ingredient) => (
            <div key={ingredient.productId} className="ingredient-item">
              <span>{ingredient.name}</span>
              <div className="ingredient-controls">
                <button
                  className="control-btn"
                  onClick={() =>
                    handleIngredientChange(ingredient.productId, "decrease")
                  }
                >
                  -
                </button>
                <span className="quantity">{ingredient.quantity}</span>
                <button
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
        </div>

        <div className="action-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button
            className="save-btn"
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
