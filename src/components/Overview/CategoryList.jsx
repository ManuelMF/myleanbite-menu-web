import React from "react";
import { useMenu } from "../../context/MenuContext";
import "../../styles/menuOverview/menuOverview.css";

const CategoryList = () => {
  const { state } = useMenu();

  return (
    <div className="submenu-container">
      <h3 className="section-title">Categorías</h3>
      <div className="submenu-grid">
        {state.menu.categories.map((category, index) => (
          <button key={index} className="submenu-button">
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
