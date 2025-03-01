import Category from "../Menu/Category";
import "./../../styles/base.css";
import { useMenu } from "../../context/MenuContext";

const MenuCategoryList = () => {
  const { state } = useMenu();
  const { selectedCategory, menu } = state;
  let menuActive = selectedCategory || menu;
  return (
    <>
      {menuActive.categories.map((category) => (
        <Category key={category.posCategoryId} category={category} />
      ))}
    </>
  );
};

export default MenuCategoryList;
