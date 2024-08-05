"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import LayoutButtons from "../components/layout-buttons";
import MatterService from "../services/matter-service";
import EventService, { EventBindings } from "../services/event-service";
import { LayoutState } from "../types/layout-state";
import ProjectService from "../services/project-service";
import { Project } from "../types/project";
import { MatterContext } from "../contexts/matter-context";
import HomeItem from "../components/home-item";
import Header from "@/components/header";

export default function HomePage() {
  const matterRef = useRef(new MatterService());

  const [projects, setProjects] = useState<Project[]>([]);
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [layout, setLayout] = useState<LayoutState>(LayoutState.Grid);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  if (element !== null) {
    const { x, y } = element.getBoundingClientRect();
    if (offset.x !== x || offset.y != y) {
      setOffset({ x, y });
    }
  }

  // Load data
  useEffect(() => {
    ProjectService.getProjects().then((projects) => setProjects(projects));
  }, []);

  useEffect(() => {
    if (element === null || layout !== LayoutState.Chaos) return;

    const matter = matterRef.current;

    const setBounds = () =>
      matter.setBounds(window.innerWidth, window.innerHeight);

    const setOrientation = () => matter.setOrientation(window.orientation);

    const setGravity = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (acceleration) {
        let x = -(acceleration.x ?? 0) / 9.8;
        let y = (acceleration.y ?? 0) / 9.8;
        matter.setGravity(x, y);
      }
    };

    const events: EventBindings = [
      [window, { resize: setBounds, devicemotion: setGravity }],
      [window.screen.orientation, { change: setOrientation }],
      [document, { visibilitychange: setBounds }],
    ];
    EventService.bindEvents(events);

    setBounds();

    matter.start();

    return () => {
      EventService.unbindEvents(events);
      matter.destroy();
    };
  }, [element, layout]);

  return (
    <main ref={(ref) => setElement(ref)} className="main">
      <Header title="Alfie Woodland" subtitle="Angular • React • .NET"></Header>
      <LayoutButtons onChange={setLayout}></LayoutButtons>
      {projects.length === 0 && <p className="loading">Loading...</p>}
      <MatterContext.Provider value={matterRef.current}>
        <div className={`${styles.homeItems} ${styles[layout]}`}>
          {projects.map((project) => (
            <HomeItem
              key={project.id}
              project={project}
              layout={layout}
            ></HomeItem>
          ))}
        </div>
      </MatterContext.Provider>
    </main>
  );
}
