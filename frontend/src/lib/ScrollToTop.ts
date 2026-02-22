import { memo, useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  }, [pathname]); // This will trigger the effect when the route changes

  return null; // No UI rendering needed
};

export default memo(ScrollToTop);
