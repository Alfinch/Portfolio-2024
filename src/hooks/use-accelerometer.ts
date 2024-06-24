import React from "react";

export default function useAccelerometer() {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(1);
  const [z, setZ] = React.useState(0);

  const updateMotion = (event: DeviceMotionEvent) => {
    const acceleration = event.accelerationIncludingGravity;
    if (acceleration) {
      setX(acceleration.x ?? 0);
      setY(acceleration.y ?? 0);
      setZ(acceleration.z ?? 0);
    }
  };

  React.useEffect(() => {
    window.addEventListener("devicemotion", updateMotion, true);
    return () => window.removeEventListener("devicemotion", updateMotion);
  });

  return { x, y, z };
}
