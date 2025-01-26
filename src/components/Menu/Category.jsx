import React from "react";
import "../../styles/menu/submenu.css";
import { useMenu } from "../../context/MenuContext";

const Category = ({ category }) => {
  const { dispatch } = useMenu();

  const handleOpenSubmenu = (item) => {
    dispatch({ type: "SET_SELECTED_ITEM", payload: item });
  };
  return (
    <div className="category">
      <h2 className="category-title">{category.name}</h2>
      <div className="category-items">
        {category.items.map((item) => (
          <div
            key={item.itemId}
            className="menu-item"
            onClick={() => handleOpenSubmenu(item)}
          >
            <span className="item-name">{item.name}</span>
            <span className="item-price">{item.price.toFixed(2)} €</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
