import React from "react";

export default function useWindowDimensions() {
  const [width, setWidth] = React.useState(window?.innerWidth ?? 0);
  const [height, setHeight] = React.useState(window?.innerHeight ?? 0);

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
