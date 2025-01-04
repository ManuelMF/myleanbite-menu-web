import React from "react";
import './../../styles/globals.css'; 


const DrinkSelector = ({ onSelect }) => {
  const drinks = [
    { id: 1, name: "Refresco", price: 2.0 },
    { id: 2, name: "Limonada", price: 3.5 },
    { id: 3, name: "Té helado", price: 3.5 },
    { id: 4, name: "Espresso", price: 2.5 },
  ];

  return (
    <div className="drink-selector">
      <h4>Bebidas</h4>
      <ul>
        {drinks.map((drink) => (
          <li key={drink.id}>
            <button className="drink-btn" onClick={() => onSelect(drink)}>
              {drink.name} (+${drink.price})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinkSelector;
