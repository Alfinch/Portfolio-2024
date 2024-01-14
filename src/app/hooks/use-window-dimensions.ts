import React from "react";

export default function useWindowDimensions() {
  if (!window) {
    return { width: 0, height: 0 };
  }

  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const [height, setHeight] = React.useState<number>(window.innerHeight);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  return {
    width,
    height,
  };
}
