"use client";

import Matter, { Sleeping } from "matter-js";
import { useEffect, useRef } from "react";
import HomeItem from "./components/home-item";
import getShapes from "./helpers/get-shapes";
import windowDimensions from "./helpers/window-dimensions";
import styles from "./page.module.css";

const BOUNDS_WIDTH = 1000;

export default function Home() {
  const { width, height } = windowDimensions();
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

    const rect = Matter.Bodies.rectangle;
    const opts = { isStatic: true };
    const bounds = [
      /* top    */ rect(
        width / 2,
        -BOUNDS_WIDTH / 2,
        width,
        BOUNDS_WIDTH,
        opts
      ),
      /* right  */ rect(
        width + BOUNDS_WIDTH / 2,
        height / 2,
        BOUNDS_WIDTH,
        height,
        opts
      ),
      /* bottom */ rect(
        width / 2,
        height + BOUNDS_WIDTH / 2,
        width,
        BOUNDS_WIDTH,
        opts
      ),
      /* left   */ rect(
        -BOUNDS_WIDTH / 2,
        height / 2,
        BOUNDS_WIDTH,
        height,
        opts
      ),
    ];

    Matter.Composite.add(engineRef.current.world, bounds);

    // When bound change, reawaken all bodies to ennsure they react
    engineRef.current.world.bodies.forEach((b) => Sleeping.set(b, false));

    return () => {
      console.log("Remove bounds");

      Matter.Composite.remove(engineRef.current.world, bounds);
    };
  }, [width, height]);

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
