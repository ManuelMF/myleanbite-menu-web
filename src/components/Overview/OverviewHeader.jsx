import "../../styles/menuOverview/menuOverview.css";
import usePreloadImage from "../../hooks/usePreloadImage";

const Header = ({ imageUrl }) => {
  usePreloadImage(imageUrl);

  return (
    <>
      {imageUrl && (
        <div className="logo-container">
          <img src={imageUrl} alt="Logo preview" />
        </div>
      )}
    </>
  );
};

export default Header;
