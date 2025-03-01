import React from "react";
import { useLoadPrincipalCategoriesAndProducts } from "../../hooks/useLoadPrincipalCategoriesAndProducts";
import "../../styles/menuOverview/menuOverview.css";
import Loading from "../Layout/Loading";
import { useMenu } from "../../context/MenuContext";

const MostOrderedDishes = () => {
  const { topProducts, loading } = useLoadPrincipalCategoriesAndProducts();
  const { dispatch } = useMenu();

  const handleOpenSubmenu = (product) => {
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
  };

  if (loading) return <Loading />;

  return (
    <div className="most-ordered-container">
      <h2 className="section-title">Más pedidos</h2>
      <div className="products-grid">
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="product-product"
            onClick={() => handleOpenSubmenu(product)}
          >
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostOrderedDishes;
