import React from "react";
import CategoryList from "../components/Overview/CategoryList";
import PrincipalCategories from "../components/Overview/PrincipalCategories";
import MostOrderedDishes from "../components/Overview/MostOrderedDishes";
import { useLoadMenu } from "../hooks/useLoadMenu";
import { useMenu } from "../context/MenuContext";
import Loading from "../components/Layout/Loading";

const MenuOverview = () => {
  const { state } = useMenu();
  const { menu } = state;
  const restaurantId = 2;
  useLoadMenu(restaurantId);

  if (!menu) return <Loading />;

  const submenus = [
    "Postres",
    "Bebidas",
    "Pastas",
    "Ensaladas",
    "Hamburguesas",
    "Sopas",
    "Entradas",
    "Tacos",
  ];
  const principales = ["Hamburguesas", "Bebidas", "Pastas", "Ensaladas"];
  const productosMasPedidos = [
    {
      id: 1,
      nombre: "Hamburguesa Gourmet",
      descripcion: "Carne Angus, queso cheddar, y cebolla caramelizada.",
      precio: "$18",
      img: "/images/hamburguesa.jpg",
    },
    {
      id: 2,
      nombre: "Ravioles de Espinaca",
      descripcion: "Con salsa de crema y parmesano.",
      precio: "$22",
      img: "/images/ravioles.jpg",
    },
    {
      id: 3,
      nombre: "Tiramisú",
      descripcion: "Postre clásico italiano con café.",
      precio: "$8",
      img: "/images/tiramisu.jpg",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <img src="/logo.png" alt="Logo del restaurante" style={styles.logo} />
      </div>
      <CategoryList />

      <PrincipalCategories />

      <MostOrderedDishes />
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    padding: "16px",
    backgroundColor: "#f7f7f7",
    color: "#333",
    maxWidth: "480px",
    margin: "0 auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  logoContainer: {
    textAlign: "center",
    marginBottom: "24px",
  },
  logo: {
    width: "150px",
    height: "auto",
  },
  submenuContainer: {
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "left",
    color: "#5a5a5a",
  },
  submenuGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  submenuButton: {
    padding: "10px",
    backgroundColor: "#fff",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  submenuButtonHover: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
  },
  principalesContainer: {
    marginBottom: "32px",
  },
  principalesList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  principalItem: {
    padding: "16px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  masPedidosContainer: {
    marginBottom: "32px",
  },
  productosGrid: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
  },
  productoItem: {
    flex: "1",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    overflow: "hidden",
  },
  productoImagen: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
  },
  productoInfo: {
    padding: "12px",
  },
  productoNombre: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  productoDescripcion: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "8px",
  },
  precio: {
    fontWeight: "bold",
    color: "#d9534f",
  },
};

export default MenuOverview;
