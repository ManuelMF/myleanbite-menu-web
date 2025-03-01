import React from "react";
import { useLoadPrincipalCategoriesAndProducts } from "../../hooks/useLoadPrincipalCategoriesAndProducts";
import "../../styles/menuOverview/menuOverview.css";
import Loading from "../Layout/Loading";
import { useMenu } from "../../context/MenuContext";
import { useNavigate } from "react-router-dom";

const PrincipalCategories = () => {
  const { state } = useMenu();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/${state.menu.restaurantId}/menu?categoryId=${categoryId}`);
  };

  const { topCategories, loading } = useLoadPrincipalCategoriesAndProducts();
  if (loading) return <Loading />;

  return (
    <div className="main-categories-container">
      <h2 className="section-title">Principales</h2>
      <div className="main-categories-list">
        {topCategories.map((category, index) => (
          <div
            key={index}
            className="main-category-product"
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrincipalCategories;
