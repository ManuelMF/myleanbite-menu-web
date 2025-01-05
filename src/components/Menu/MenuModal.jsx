import React, { useState } from "react";
import '../../styles/submenu.css';

const MenuModal = ({ item, onClose, onAddToOrder }) => {
  const [ingredientQuantities, setIngredientQuantities] = useState(
    item.ingredientsDTO.map((ingredient) => ({
      ...ingredient,
      quantity: 0,
    }))
  );

  const [selectedExtras, setSelectedExtras] = useState([]);

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

  const handleAddToOrder = () => {
    onAddToOrder(item, ingredientQuantities, selectedExtras);
  };

  return (
    <div className="menu-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2 className="modal-title">{item.name}</h2>
        <p className="modal-description">
          {item.description || "Sin descripción disponible"}
        </p>

        <h3>Ingredientes</h3>
        <ul className="ingredients-list">
          {ingredientQuantities.map((ingredient) => (
            <li key={ingredient.productId} className="ingredient-item">
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
            </li>
          ))}
        </ul>

        {item.extrasDTO && (
          <>
            <h3>Extras</h3>
            <ul className="extras-list">
              {item.extrasDTO.map((extra) => (
                <li key={extra.productId} className="extra-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(extra)}
                      onChange={() =>
                        setSelectedExtras((prev) =>
                          prev.includes(extra)
                            ? prev.filter((e) => e !== extra)
                            : [...prev, extra]
                        )
                      }
                    />
                    {extra.name} (+${extra.price.toFixed(2)})
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}

        <button className="confirm-btn" onClick={handleAddToOrder}>
          Añadir al pedido
        </button>
      </div>
    </div>
  );
};

export default MenuModal;
