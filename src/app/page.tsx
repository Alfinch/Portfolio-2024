"use client";

import { useEffect, useRef, useState } from "react";
import getShapes from "./helpers/get-shapes";
import getWorldBounds from "./helpers/get-world-bounds";
import HomeItem from "./components/home-item";
import Matter, { Composite, Sleeping } from "matter-js";
import styles from "./page.module.css";

export default function Home() {
  const shapes = useRef(getShapes());
  const [orientation, setOrientation] = useState(0);

  useEffect(() => {
    console.log("Initialise engine");

    const engine = Matter.Engine.create({
      enableSleeping: true,
    });

    Composite.add(
      engine.world,
      shapes.current.map((s) => s.body)
    );

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    console.log("Begin listening to window resize");

    let bounds: Matter.Body[];
    const updateBounds = () => {
      console.log("Update bounds");

      if (bounds) {
        Matter.Composite.remove(engine.world, bounds);
      }
      bounds = getWorldBounds(window.innerWidth, window.innerHeight);
      Matter.Composite.add(engine.world, bounds);

      // When bound change, reawaken all bodies to ensure they react
      engine.world.bodies.forEach(
        (b) => b.isSleeping && Sleeping.set(b, false)
      );
    };
    window.addEventListener("resize", updateBounds);
    updateBounds();

    console.log("Begin listening to screen orientation");

    let orientation = 0;
    const updateOrientation = () => {
      console.log("Update orientation");
      orientation = window.orientation;
      setOrientation(orientation);
    };
    window.screen.orientation.addEventListener("change", updateOrientation);
    updateOrientation();

    console.log("Begin listening to accelerometer");

    const updateGravity = (event: DeviceMotionEvent) => {
      console.log("Update gravity");

      const acceleration = event.accelerationIncludingGravity;
      if (acceleration) {
        let x = (acceleration.x ?? 0) * -0.1;
        let y = (acceleration.y ?? 0) * 0.1;

        switch (orientation) {
          case -90:
            [x, y] = [y, x];
          case 90:
            [x, y] = [-y, x];
          case 180:
            [x, y] = [-x, -y];
        }

        engine.gravity.x = x;
        engine.gravity.y = y;
      }

      // When bound change, reawaken all bodies to ensure they react
      engine.world.bodies.forEach(
        (b) => b.isSleeping && Sleeping.set(b, false)
      );
    };
    window.addEventListener("devicemotion", updateGravity, true);
    updateGravity({ acceleration: { x: 0, y: 1 } } as DeviceMotionEvent);

    return () => {
      console.log("Reset engine");
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);

      console.log("Stop listening to window resize");
      window.removeEventListener("resize", updateBounds);

      console.log("Stop listening to screen orientation");
      window.screen.orientation.removeEventListener(
        "change",
        updateOrientation
      );

      console.log("Stop listening to accelerometer");
      window.removeEventListener("devicemotion", updateGravity);
    };
  }, []);

  return (
    <main className={styles.main}>
      <p>{orientation}</p>
      {shapes.current.map((shape) => (
        <HomeItem
          key={shape.key}
          shape={shape.type}
          body={shape.body}
          x={shape.x}
          y={shape.y}
        />
      ))}
    </main>
  );
}
