import React from "react";
import { useLoadMoreRequestedCategories } from "../../hooks/useLoadPrincipalCategories";
import "../../styles/menuOverview/menuOverview.css";
import Loading from "../Layout/Loading";

const PrincipalCategories = () => {
  const { categories, loading } = useLoadMoreRequestedCategories();
  if (loading) return <Loading />;

  return (
    <div className="main-categories-container">
      <h2 className="section-title">Principales</h2>
      <div className="main-categories-list">
        {categories.map((category, index) => (
          <div key={index} className="main-category-item">
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrincipalCategories;
