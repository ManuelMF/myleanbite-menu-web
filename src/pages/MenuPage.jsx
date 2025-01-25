import React, { useEffect } from "react";
import { useMenu } from "../context/MenuContext";
import { fetchMenu } from "../services/api";
import MenuCategoryList from "../components/Menu/MenuCategoryList";
import SubMenuWrapper from "../components/Menu/SubMenuWrapper";
import CustomizeMenu from "../components/Menu/CustomizeMenu";
import OrderSummary from "../components/Menu/OrderSummary";
import Notification from "../components/Menu/Notification";
import Loading from "../components/Layout/Loading";

const MenuPage = () => {
  const { state, dispatch } = useMenu();
  const { menu, order, showNotification } = state;

  const restaurantId = 2;

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenu(restaurantId);
        dispatch({ type: "SET_MENU", payload: data });
      } catch (error) {
        console.error("Error al cargar el menú", error);
      }
    };
    loadMenu();
  }, [restaurantId]);

  const handleOpenSubmenu = (item) => {
    dispatch({ type: "SET_SELECTED_ITEM", payload: item });
  };

  if (!menu) return <Loading />;

  return (
    <div className="menu-page">
      <h1 className="menu-title">{`Menú del Restaurante ${menu.restaurantId}`}</h1>
      <MenuCategoryList
        categories={menu.categories}
        onSelectCategory={handleOpenSubmenu}
      />

      <SubMenuWrapper />

      <CustomizeMenu />

      <OrderSummary order={order} />

      <Notification showNotification={showNotification} />
    </div>
  );
};

export default MenuPage;
