"use client";

import Matter, { Engine, Sleeping } from "matter-js";
import { useEffect, useRef, useState } from "react";
import getBody from "../helpers/get-body";
import styles from "../page.module.css";
import { ShapeType } from "../types/shape-type";

interface HomeItemProps {
  body: Matter.Body;
  shape: ShapeType;
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
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        {props.shape === ShapeType.square && (
          <rect
            x="61.45"
            y="61.45"
            width="77.10"
            height="77.10"
            fill="#22BB66"
          />
        )}
        {props.shape === ShapeType.pentagon && (
          <polygon
            points="129.39,140.45 70.61,140.45 52.45,84.55 100.00,50.00 147.55,84.55"
            fill="#2288DD"
            transform="rotate(53.5, 100, 100)"
          />
        )}
        {props.shape === ShapeType.hexagon && (
          <polygon
            points="97.83,50.00 73.92,91.42 26.08,91.42 2.17,50.00 26.08,8.58 73.92,8.58"
            transform="translate(50,50) rotate(30, 50, 50)"
            fill="#DD7700"
          />
        )}
        {props.shape === ShapeType.rectangle && (
          <rect
            x="22.9"
            y="80.725"
            width="154.20"
            height="38.55"
            fill="#6644FF"
          />
        )}
        {props.shape === ShapeType.circle && (
          <circle cx="100" cy="100" r="43.5" fill="#DD2288" />
        )}
      </svg>
    </div>
  );
}
