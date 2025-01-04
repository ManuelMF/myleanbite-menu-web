import React, { useState } from "react";
import ExtraSelector from "./ExtraSelector";
import DrinkSelector from "./DrinkSelector";
import './../../styles/globals.css'; 

const ItemCard = ({ item }) => {
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const handleExtraSelection = (extra) => {
    setSelectedExtras((prev) => [...prev, extra]);
  };

  const handleDrinkSelection = (drink) => {
    setSelectedDrink(drink);
  };

  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <p>{item.description || "Sin descripción"}</p>
      <p><strong>${item.price}</strong></p>

      {item.extrasDTO && (
        <ExtraSelector extras={item.extrasDTO} onSelect={handleExtraSelection} />
      )}

      <div className="ingredients">
        {item.ingredientsDTO && (
          <>
            <h4>Ingredientes</h4>
            <ul>
              {item.ingredientsDTO.map((ingredient) => (
                <li key={ingredient.productId}>
                  {ingredient.name} (+${ingredient.price})
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <DrinkSelector onSelect={handleDrinkSelection} />

      <button className="order-button">Agregar al pedido</button>
    </div>
  );
};

export default ItemCard;
