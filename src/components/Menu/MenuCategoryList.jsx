import Category from "../Menu/Category";
import "./../../styles/base.css";

const MenuCategoryList = ({ categories, onSelectCategory }) => {
  return (
    <>
      {categories.map((category) => (
        <Category
          key={category.posCategoryId}
          category={category}
          onSelectItem={onSelectCategory}
        />
      ))}
    </>
  );
};

export default MenuCategoryList;
