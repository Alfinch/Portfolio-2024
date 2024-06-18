"use client";

import { useContext, useEffect, useRef, useState } from "react";
import styles from "./home-item.module.css";
import useWindowDimensions from "../hooks/use-window-dimensions";
import { MatterContext } from "../contexts/matter-context";
import MatterService from "../services/matter-service";

interface HomeItemProps {
  id: string;
  url: string;
  image: string;
  physics: boolean;
  offset: { x: number; y: number };
}

export default function HomeItem(props: HomeItemProps) {
  console.log(`Render HomeItem: ${props.id}`);

  const matter = useContext(MatterContext) ?? new MatterService();

  useWindowDimensions(200);

  const bodyRef = useRef<Matter.Body>();

  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [ghostElement, setGhostElement] = useState<HTMLDivElement | null>(null);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [rotation, setRotation] = useState(0);

  var classes = [styles.homeItem];
  if (!props.physics) {
    classes.push(styles.easeTransform);

    if (bodyRef.current !== undefined) {
      matter.removeBody(bodyRef.current);
      bodyRef.current = undefined;
    }

    if (ghostElement !== null) {
      const { x, y, width, height } = ghostElement.getBoundingClientRect();
      const newDx = x + width / 2 - props.offset.x;
      const newDy = y + height / 2 - props.offset.y;
      if (newDx !== dx || newDy !== dy) {
        console.log(`Position HomeItem: ${props.id}`);
        setDx(newDx);
        setDy(newDy);
      }
    }
  }

  // All physics-related code here!
  useEffect(() => {
    if (element === null || !props.physics) return;

    console.log("Start animating home item");

    if (bodyRef.current === undefined) {
      const { x, y, width, height } = element.getBoundingClientRect();
      const bodyX = x + width / 2;
      const bodyY = y + height / 2;
      bodyRef.current = matter.addBody(bodyX, bodyY);
    }

    const body = bodyRef.current;
    let animationFrameId: number;

    if (!body.isSleeping) {
      console.log("HomeItem Update body");
      setDx(body.position.x);
      setDy(body.position.y);
      setRotation(body.angle);
    }

    return () => {
      console.log("Stop animating home item");
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    element,
    props.physics,
    bodyRef.current?.position.x,
    bodyRef.current?.position.y,
    bodyRef.current?.angle,
    bodyRef.current?.isSleeping,
  ]);

  return (
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <image
        width="100"
        height="100"
        clipPath={"url(#circle)"}
        href={props.image}
      ></image>
    </svg>
  );
}
