import React from "react";
import { useMenu } from "../context/MenuContext";
import { useLoadMenu } from "../hooks/useLoadMenu";
import { useRestaurant } from "../hooks/useRestaurant";
import CategoryList from "../components/Overview/CategoryList";
import PrincipalCategories from "../components/Overview/PrincipalCategories";
import OverviewHeader from "../components/Overview/OverviewHeader";
import MostOrderedDishes from "../components/Overview/MostOrderedDishes";
import Loading from "../components/Layout/Loading";
import "../styles/menuOverview/menuOverview.css";
import { useParams } from "react-router-dom";
import SubMenuWrapper from "../components/Menu/SubMenuWrapper";
import CustomizeMenu from "../components/Menu/CustomizeMenu";
import OrderSummary from "../components/Menu/OrderSummary";
import Notification from "../components/Menu/Notification";
import NotificationPostOrder from "../components/Menu/NotificationPostOrder";
import SplashScreen from "../components/Overview/SplashScreen";

const MenuOverview = () => {
  const { state } = useMenu();
  const { menu } = state;
  const { restaurantId, tableNumberId } = useParams();

  useLoadMenu(restaurantId, tableNumberId);
  const restaurant = useRestaurant(restaurantId);

  if (!menu) return <Loading />;

  return (
    <div className="container">
      <SplashScreen imageUrl={restaurant?.splash_image} />
      <OverviewHeader imageUrl={restaurant?.logo} />

      <CategoryList />

      <PrincipalCategories />

      <MostOrderedDishes />
      <SubMenuWrapper />
      <CustomizeMenu />
      <Notification />
      <NotificationPostOrder />

      <OrderSummary />
    </div>
  );
};

export default MenuOverview;
