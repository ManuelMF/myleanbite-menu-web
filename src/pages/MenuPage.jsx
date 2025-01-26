import React from "react";
import { useMenu } from "../context/MenuContext";
import MenuCategoryList from "../components/Menu/MenuCategoryList";
import SubMenuWrapper from "../components/Menu/SubMenuWrapper";
import CustomizeMenu from "../components/Menu/CustomizeMenu";
import OrderSummary from "../components/Menu/OrderSummary";
import Notification from "../components/Menu/Notification";
import Loading from "../components/Layout/Loading";
import { useLoadMenu } from "../hooks/useLoadMenu";

const MenuPage = () => {
  const { state } = useMenu();
  const { menu } = state;

  const restaurantId = 2;

  useLoadMenu(restaurantId);

  if (!menu) return <Loading />;

  return (
    <div className="menu-page">
      <h1 className="menu-title">{`Menú del Restaurante ${menu.restaurantId}`}</h1>
      <MenuCategoryList />

      <SubMenuWrapper />

      <CustomizeMenu />

      <OrderSummary />

      <Notification />
    </div>
  );
};

export default MenuPage;
