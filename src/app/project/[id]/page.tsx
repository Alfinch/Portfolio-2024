"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProjectService from "@/services/project-service";
import { Project } from "@/types/project";

export default function ProjectPage({ params }: { params: { id: number } }) {
  const [project, setProject] = useState<Project>();
  const [currentUpdate, setCurrentUpdate] = useState<number>(0);

  function canGoPrevious() {
    return currentUpdate > 0;
  }

  function canGoNext() {
    return currentUpdate < (project?.updates.length ?? 0) - 1;
  }

  function previous() {
    if (canGoPrevious()) {
      setCurrentUpdate(currentUpdate - 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  function next() {
    if (canGoNext()) {
      setCurrentUpdate(currentUpdate + 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  useEffect(() => {
    if (!project || project.updates.length === 0) return;
    setCurrentUpdate(project.updates.length - 1);
  }, [project]);

  useEffect(() => {
    ProjectService.getProject(params.id).then((project) => setProject(project));
  }, []);

  return (
    <main className="main">
      {!project && <p className="loading">Loading...</p>}
      {project && (
        <>
          <div
            className="header withImage"
            style={
              {
                "--background-image": `url('https://alfiewoodlandmedia.blob.core.windows.net/media/${project?.image}.jpg')`,
              } as React.CSSProperties
            }
          >
            <a className="home" href="/"></a>
            <h1>{project?.title}</h1>
            <h2>{project?.description}</h2>
          </div>
          <div className={styles.navigation}>
            {canGoPrevious() && (
              <button
                type="button"
                onClick={previous}
                className={styles.previous}
              >
                Previous: {project?.updates[currentUpdate - 1]?.title ?? ""}
              </button>
            )}
            <h1>{project?.updates[currentUpdate]?.title ?? ""}</h1>
            <h2>
              {project?.updates[currentUpdate]?.date.toLocaleDateString() ?? ""}
            </h2>
            {canGoNext() && (
              <button type="button" onClick={next} className={styles.next}>
                Next: {project?.updates[currentUpdate + 1]?.title ?? ""}
              </button>
            )}
          </div>
          <article
            className="article"
            dangerouslySetInnerHTML={{
              __html: project?.updates[currentUpdate]?.body ?? "",
            }}
          ></article>
          <div className={styles.footNavigation}>
            {canGoPrevious() && (
              <button
                type="button"
                onClick={previous}
                className={styles.previous}
              >
                Previous: {project?.updates[currentUpdate - 1]?.title ?? ""}
              </button>
            )}
            {canGoNext() && (
              <button type="button" onClick={next} className={styles.next}>
                Next: {project?.updates[currentUpdate + 1]?.title ?? ""}
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
