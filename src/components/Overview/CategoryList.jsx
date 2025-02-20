import React from "react";
import { useMenu } from "../../context/MenuContext";
import "../../styles/menuOverview/menuOverview.css";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const { state } = useMenu();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/${state.menu.restaurantId}/menu?category=${categoryId}`);
  };
  console.log(state.menu.categories);
  return (
    <div className="submenu-container">
      <h3 className="section-title">Categorías</h3>
      <div className="submenu-grid">
        {state.menu.categories.map((category, index) => (
          <button
            key={index}
            className="submenu-button"
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
