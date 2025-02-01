import React from "react";
import { useMenu } from "../context/MenuContext";
import { useLoadMenu } from "../hooks/useLoadMenu";
import CategoryList from "../components/Overview/CategoryList";
import PrincipalCategories from "../components/Overview/PrincipalCategories";
import OverviewHeader from "../components/Overview/OverviewHeader";
import MostOrderedDishes from "../components/Overview/MostOrderedDishes";
import Loading from "../components/Layout/Loading";
import "../styles/menuOverview/menuOverview.css";

const MenuOverview = () => {
  const { state } = useMenu();
  const { menu } = state;
  const restaurantId = 2;
  useLoadMenu(restaurantId);

  if (!menu) return <Loading />;

  return (
    <div className="container">
      <OverviewHeader />

      <CategoryList />

      <PrincipalCategories />

      <MostOrderedDishes />
    </div>
  );
};

export default MenuOverview;
