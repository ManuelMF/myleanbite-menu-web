import React from "react";
import { useMenu } from "../context/MenuContext";
import { useLoadMenu } from "../hooks/useLoadMenu";
import CategoryList from "../components/Overview/CategoryList";
import PrincipalCategories from "../components/Overview/PrincipalCategories";
import OverviewHeader from "../components/Overview/OverviewHeader";
import MostOrderedDishes from "../components/Overview/MostOrderedDishes";
import Loading from "../components/Layout/Loading";
import "../styles/menuOverview/menuOverview.css";
import { useParams } from "react-router-dom";

const MenuOverview = () => {
  const { state } = useMenu();
  const { menu } = state;
  const { restaurantId } = useParams();

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
