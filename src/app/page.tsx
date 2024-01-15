"use client";

import { useEffect, useRef } from "react";
import getShapes from "./helpers/get-shapes";
import getWorldBounds from "./helpers/get-world-bounds";
import HomeItem from "./components/home-item";
import Matter, { Composite, Sleeping } from "matter-js";
import styles from "./page.module.css";

export default function Home() {
  const shapes = useRef(getShapes());

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

    let isRotated = false;
    let isInverted = false;
    const updateOrientation = () => {
      const orientation = window.screen.orientation.type;
      isRotated = /^landscape/.test(orientation);
      isInverted = /secondary$/.test(orientation);
    };
    window.screen.orientation.addEventListener("change", updateOrientation);
    updateOrientation();

    console.log("Begin listening to accelerometer");

    const updateGravity = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (acceleration) {
        const x = (acceleration.x ?? 0) * 0.1;
        const y = (acceleration.y ?? 0) * 0.1;
        engine.gravity.x = isRotated ? (isInverted ? -y : y) : x;
        engine.gravity.y = isRotated ? x : isInverted ? -y : y;
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
