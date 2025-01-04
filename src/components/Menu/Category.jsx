import React from "react";
import './../../styles/globals.css'; 

const Category = ({ category, onSelectItem }) => { // Cambiar onItemClick a onSelectItem
  return (
    <div className="category">
      <h2 className="category-title">{category.name}</h2>
      <div className="category-items">
        {category.items.map((item) => (
          <div
            key={item.itemId}
            className="menu-item"
            onClick={() => onSelectItem(item)} // Cambiar onItemClick por onSelectItem
          >
            <span className="item-name">{item.name}</span>
            <span className="item-price">${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
