import Category from "../Menu/Category";
import "./../../styles/base.css";
import { useMenu } from "../../context/MenuContext";

const MenuCategoryList = () => {
  const { state } = useMenu();

  return (
    <>
      {state.menu.categories.map((category) => (
        <Category key={category.posCategoryId} category={category} />
      ))}
    </>
  );
};

export default MenuCategoryList;
