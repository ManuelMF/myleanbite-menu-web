import React from "react";
import { useMenu } from "../../context/MenuContext";
import "../../styles/menuOverview/menuOverview.css";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const { state } = useMenu();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/${state.menu.restaurantId}/menu?categoryId=${categoryId}`);
  };

  const categories = state.menu.categories;
  const isOdd = categories.length % 2 !== 0;
  const lastIndex = categories.length - 1;

  return (
    <div className="submenu-container">
      <h3 className="section-title">Categorías</h3>
      <div className="submenu-grid">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`submenu-button ${
              isOdd && index === lastIndex ? "expanded" : ""
            }`}
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
