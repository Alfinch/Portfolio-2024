import React from "react";

export default function useWindowDimensions(debounce?: number) {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const onResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  let timeoutId: number;
  const debouncedOnResize = () => {
    if (debounce) {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(onResize, debounce);
    } else {
      onResize();
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", debouncedOnResize);
    return () => window.removeEventListener("resize", debouncedOnResize);
  });

  return {
    width,
    height,
  };
}
