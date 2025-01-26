import React from "react";
import { useLoadPrincipalDishes } from "../../hooks/useLoadPrincipalDishes";
import "../../styles/menuOverview/menuOverview.css";
import Loading from "../Layout/Loading";

const MostOrderedDishes = () => {
  const { dishes, loading } = useLoadPrincipalDishes();
  if (loading) return <Loading />;

  return (
    <div className="most-ordered-container">
      <h2 className="section-title">Más pedidos</h2>
      <div className="products-grid">
        {dishes.map((dish) => (
          <div key={dish.id} className="product-item">
            <div className="product-info">
              <h3 className="product-name">{dish.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostOrderedDishes;
