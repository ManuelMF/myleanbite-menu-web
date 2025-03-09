import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useMenu } from "../context/MenuContext";
import MenuCategoryList from "../components/Menu/MenuCategoryList";
import SubMenuWrapper from "../components/Menu/SubMenuWrapper";
import CustomizeMenu from "../components/Menu/CustomizeMenu";
import OrderSummary from "../components/Menu/OrderSummary";
import Notification from "../components/Menu/Notification";
import Loading from "../components/Layout/Loading";
import { useLoadMenuByCategory } from "../hooks/useLoadMenuByCategory";
import { FaArrowLeft } from "react-icons/fa";

const MenuPage = () => {
  const { state } = useMenu();
  const { selectedCategory, menu } = state;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { restaurantId, tableNumberId } = useParams();
  const categoryId = searchParams.get("categoryId");

  useLoadMenuByCategory(restaurantId, categoryId, tableNumberId);

  if (!selectedCategory && !menu) return <Loading />;

  return (
    <div className="container">
      <div className="menu-page">
        <button
          className="back-button"
          onClick={() => navigate(`/${restaurantId}/menu/overview`)}
        >
          <FaArrowLeft />
        </button>

        <h1 className="menu-title">{`Menú del Restaurante ${restaurantId}`}</h1>
        <MenuCategoryList />

        <SubMenuWrapper />

        <CustomizeMenu />

        <OrderSummary />

        <Notification />
      </div>
    </div>
  );
};

export default MenuPage;
