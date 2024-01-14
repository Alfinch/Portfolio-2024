"use client";

import { useEffect, useRef } from "react";
import useAccelerometer from "./hooks/use-accelerometer";
import getShapes from "./helpers/get-shapes";
import getWorldBounds from "./helpers/get-world-bounds";
import HomeItem from "./components/home-item";
import Matter, { Sleeping } from "matter-js";
import styles from "./page.module.css";
import useWindowDimensions from "./hooks/use-window-dimensions";
import dynamic from "next/dynamic";

function Home() {
  const { width, height } = useWindowDimensions();
  const { x, y } = useAccelerometer();

  const engineRef = useRef(
    Matter.Engine.create({
      enableSleeping: true,
    })
  );
  const shapes = useRef([...getShapes()]);

  console.log({ shapes });

  useEffect(() => {
    console.log("Initialise engine");
    const engine = engineRef.current;

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    return () => {
      console.log("Reset engine");
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  useEffect(() => {
    console.log("Initialise bounds");
    const engine = engineRef.current;

    const bounds = getWorldBounds(width, height);
    Matter.Composite.add(engine.world, bounds);

    // When bound change, reawaken all bodies to ensure they react
    engine.world.bodies.forEach((b) => b.isSleeping && Sleeping.set(b, false));

    return () => {
      console.log("Remove bounds");

      Matter.Composite.remove(engine.world, bounds);
    };
  }, [width, height]);

  useEffect(() => {
    console.log("Update gravity", { x, y });
    const engine = engineRef.current;

    engine.gravity.x = x;
    engine.gravity.y = y;

    // When gravity changes, reawaken all bodies to ensure they react
    engine.world.bodies.forEach((b) => b.isSleeping && Sleeping.set(b, false));
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

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
