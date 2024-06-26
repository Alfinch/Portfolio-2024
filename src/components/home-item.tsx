"use client";

import { useContext, useEffect, useRef, useState } from "react";
import styles from "./home-item.module.css";
import Link from "next/link";
import { Project } from "@/types/project";
import { LayoutState } from "@/types/layout-state";
import { MatterContext } from "@/contexts/matter-context";
import MatterService from "@/services/matter-service";
import useWindowDimensions from "@/hooks/use-window-dimensions";

interface HomeItemProps {
  project: Project;
  layout: LayoutState;
}

export default function HomeItem(props: HomeItemProps) {
  console.log(`Render HomeItem: ${props.project.id}`);

  const matter = useContext(MatterContext) ?? new MatterService();

  useWindowDimensions(200);

  const bodyRef = useRef<Matter.Body>();

  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [ghostElement, setGhostElement] = useState<HTMLDivElement | null>(null);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [rotation, setRotation] = useState(0);

  // var classes = [styles.homeItem];
  // if (props.layout === LayoutState.Chaos) {
  //   classes.push(styles.easeTransform);

  //   if (bodyRef.current !== undefined) {
  //     matter.removeBody(bodyRef.current);
  //     bodyRef.current = undefined;
  //   }

  //   if (ghostElement !== null) {
  //     const { x, y, width, height } = ghostElement.getBoundingClientRect();
  //     const newDx = x + width / 2 - props.offset.x;
  //     const newDy = y + height / 2 - props.offset.y;
  //     if (newDx !== dx || newDy !== dy) {
  //       console.log(`Position HomeItem: ${props.id}`);
  //       setDx(newDx);
  //       setDy(newDy);
  //     }
  //   }
  // }

  // // All physics-related code here!
  // useEffect(() => {
  //   if (element === null || !props.physics) return;

  //   console.log("Start animating home item");

  //   if (bodyRef.current === undefined) {
  //     const { x, y, width, height } = element.getBoundingClientRect();
  //     const bodyX = x + width / 2;
  //     const bodyY = y + height / 2;
  //     bodyRef.current = matter.addBody(bodyX, bodyY);
  //   }

  //   const body = bodyRef.current;
  //   let animationFrameId: number;

  //   if (!body.isSleeping) {
  //     console.log("HomeItem Update body");
  //     setDx(body.position.x);
  //     setDy(body.position.y);
  //     setRotation(body.angle);
  //   }

  //   return () => {
  //     console.log("Stop animating home item");
  //     cancelAnimationFrame(animationFrameId);
  //   };
  // }, [
  //   element,
  //   props.physics,
  //   bodyRef.current?.position.x,
  //   bodyRef.current?.position.y,
  //   bodyRef.current?.angle,
  //   bodyRef.current?.isSleeping,
  // ]);

  return (
    <Link href={"/project/" + props.project.id} className={styles.homeItemLink}>
      <div
        className={`${styles.homeItem} ${
          { grid: styles.grid, list: styles.list, chaos: styles.chaos }[
            props.layout
          ]
        }`}
      >
        <div className={styles.homeItemContent}>
          <img
            src={`https://media.alfiewoodland.com/media/${props.project.image}.jpg`}
            alt={"Image for " + props.project.title}
          />
          <div className={styles.projectSummary}>
            <h3>{props.project.title}</h3>
            {props.project.firstUpdated && (
              <h4>
                <span>
                  Started {props.project.firstUpdated.toLocaleDateString()}
                </span>
                {props.layout === LayoutState.Grid && <br />}
                {props.layout === LayoutState.List && " - "}
                <span>
                  Updated {props.project.lastUpdated.toLocaleDateString()}
                </span>
              </h4>
            )}
            {props.layout === LayoutState.List && (
              <p>{props.project.description}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
