import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMenu } from "../context/MenuContext";
import MenuCategoryList from "../components/Menu/MenuCategoryList";
import SubMenuWrapper from "../components/Menu/SubMenuWrapper";
import CustomizeMenu from "../components/Menu/CustomizeMenu";
import OrderSummary from "../components/Menu/OrderSummary";
import Notification from "../components/Menu/Notification";
import Loading from "../components/Layout/Loading";
import { useLoadMenuByCategory } from "../hooks/useLoadMenuByCategory";

const MenuPage = () => {
  const { state } = useMenu();
  const { selectedCategory, menu } = state;
  const [searchParams] = useSearchParams();

  const { restaurantId } = useParams();
  const categoryId = searchParams.get("categoryId");

  useLoadMenuByCategory(restaurantId, categoryId);

  if (!selectedCategory && !menu) return <Loading />;

  return (
    <div className="menu-page">
      <h1 className="menu-title">{`Menú del Restaurante ${restaurantId}`}</h1>
      <MenuCategoryList />

      <SubMenuWrapper />

      <CustomizeMenu />

      <OrderSummary />

      <Notification />
    </div>
  );
};

export default MenuPage;
