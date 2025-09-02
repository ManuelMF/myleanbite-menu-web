import { useState, useEffect } from "react";
import "../../styles/menuOverview/splashScreen.css";

const SplashScreen = ({ imageUrl }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      setVisible(true);
    }
  }, []);

  const handleClick = () => {
    setVisible(false);
    localStorage.setItem("hasSeenSplash", "true");
  };

  if (!visible || !imageUrl) return null;

  return (
    <div className="splash-screen" onClick={handleClick}>
      <img src={imageUrl} alt="Splash" className="splash-image" />
    </div>
  );
};

export default SplashScreen;
