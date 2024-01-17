"use client";

import { useEffect, useRef } from "react";
import getShapes from "./helpers/get-shapes";
import getWorldBounds from "./helpers/get-world-bounds";
import HomeItem from "./components/home-item";
import Matter, { Composite, Sleeping } from "matter-js";
import styles from "./page.module.css";

export default function Home() {
  const shapes = useRef(
    getShapes([
      {
        url: "/art/fox-papercraft",
        image: "papercraft-fox.png",
      },
      {
        url: "/art/badger-papercraft",
        image: "papercraft-badger.png",
      },
      {
        url: "/art/hedgehog-papercraft",
        image: "papercraft-hedgehog.png",
      },
      {
        url: "/art/geometric-clock-face",
        image: "geometric-clock-face.png",
      },
      {
        url: "/art/puffins",
        image: "puffins.jpg",
      },
      {
        url: "/experiments/printytron",
        image: "printytron.png",
      },
      {
        url: "/graphics/cas-logo",
        image: "cas-logo.png",
      },
    ])
  );

  useEffect(() => {
    console.log("Initialise engine");

    const engine = Matter.Engine.create({
      enableSleeping: true,
    });

    Composite.add(
      engine.world,
      shapes.current.map((s) => s.body)
    );

    const mouseConstraint = Matter.MouseConstraint.create(engine);
    Composite.add(engine.world, mouseConstraint);

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
            [x, y] = [-y, x];
            break;
          case 90:
            [x, y] = [y, -x];
            break;
          case 180:
            [x, y] = [-x, -y];
            break;
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
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="square">
            <rect x="11" y="11" width="78" height="78" />
          </clipPath>
          <clipPath id="circle">
            <circle cx="50" cy="50" r="44" />
          </clipPath>
          <clipPath id="pentagon">
            <polygon points="79.39,90.45 20.61,90.45 2.45,34.55 50.00,0.00 97.55,34.55" />
          </clipPath>
          <clipPath id="hexagon">
            <polygon points="97.83,50.00 73.92,91.42 26.08,91.42 2.17,50.00 26.08,8.58 73.92,8.58" />
          </clipPath>
        </defs>
      </svg>
      <h1>Alfie Woodland</h1>
      <h2>Full-stack developer</h2>
      <p>Site under construction</p>
      {shapes.current.map((shape) => (
        <HomeItem
          key={shape.key}
          url={shape.url}
          image={shape.image}
          shape={shape.type}
          body={shape.body}
          x={shape.x}
          y={shape.y}
        />
      ))}
    </main>
  );
}
