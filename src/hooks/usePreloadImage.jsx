import { useEffect } from "react";

const usePreloadImage = (url) => {
  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.src = url;
  }, [url]);
};

export default usePreloadImage;
