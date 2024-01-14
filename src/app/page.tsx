"use client";

import { useEffect, useRef } from "react";
import accelerometer from "./helpers/accelerometer";
import getShapes from "./helpers/get-shapes";
import getWorldBounds from "./helpers/get-world-bounds";
import HomeItem from "./components/home-item";
import Matter, { Sleeping } from "matter-js";
import styles from "./page.module.css";
import windowDimensions from "./helpers/window-dimensions";

export default function Home() {
  const { width, height } = windowDimensions();
  const { x, y } = accelerometer();

  const engineRef = useRef(
    Matter.Engine.create({
      enableSleeping: true,
    })
  );
  const shapes = useRef([...getShapes()]);

  console.log({ shapes });

  useEffect(() => {
    console.log("Initialise engine");

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engineRef.current);

    return () => {
      console.log("Reset engine");
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
    };
  }, []);

  useEffect(() => {
    console.log("Initialise bounds");

    const bounds = getWorldBounds(width, height);
    Matter.Composite.add(engineRef.current.world, bounds);

    // When bound change, reawaken all bodies to ensure they react
    engineRef.current.world.bodies.forEach(
      (b) => b.isSleeping && Sleeping.set(b, false)
    );

    return () => {
      console.log("Remove bounds");

      Matter.Composite.remove(engineRef.current.world, bounds);
    };
  }, [width, height]);

  useEffect(() => {
    console.log("Update gravity", { x, y });

    engineRef.current.gravity.x = x;
    engineRef.current.gravity.y = y;

    // When gravity changes, reawaken all bodies to ensure they react
    engineRef.current.world.bodies.forEach(
      (b) => b.isSleeping && Sleeping.set(b, false)
    );
  }, [x, y]);

  return (
    <main className={styles.main}>
      {shapes.current.map((shape) => (
        <HomeItem
          key={shape.key}
          shape={shape.type}
          engine={engineRef.current}
          x={shape.x}
          y={shape.y}
        />
      ))}
    </main>
  );
}
