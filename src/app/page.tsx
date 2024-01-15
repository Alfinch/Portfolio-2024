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

    console.log("Lock screen orientation");
    window.screen.orientation["lock"]("any");

    console.log("Begin listening to accelerometer");

    const updateGravity = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (acceleration) {
        engine.gravity.x = (acceleration.x ?? 0) * -0.1;
        engine.gravity.y = (acceleration.y ?? 0) * 0.1;
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

      console.log("Unlock screen orientation");
      window.screen.orientation["unlock"]();

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
