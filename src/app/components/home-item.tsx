"use client";

import Matter from "matter-js";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { ShapeType } from "../types/shape-type";

interface HomeItemProps {
  body: Matter.Body;
  shape: ShapeType;
  url: string;
  image: string;
  x: number;
  y: number;
}

export default function HomeItem(props: HomeItemProps) {
  const [x, setX] = useState(props.x);
  const [y, setY] = useState(props.y);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    console.log("Begin animating home item");
    const body = props.body;

    let animationFrameId: number;

    const render = () => {
      animationFrameId = requestAnimationFrame(() => {
        if (!body.isSleeping) {
          console.log("Update body");
          setX(body.position.x);
          setY(body.position.y);
          setRotation(body.angle);
        }

        render();
      });
    };

    render();

    return () => {
      console.log("Stop animating home item");
      cancelAnimationFrame(animationFrameId);
    };
  }, [props.body]);

  return (
    <div
      className={styles.homeItem}
      style={{ transform: `translate(${x}px, ${y}px) rotate(${rotation}rad)` }}
    >
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <image
          width="100"
          height="100"
          clipPath={"url(#" + ShapeType[props.shape] + ")"}
          href={props.image}
        ></image>
      </svg>
    </div>
  );
}
