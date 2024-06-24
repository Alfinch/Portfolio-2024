"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProjectService from "@/services/project-service";
import { Project } from "@/types/project";
import { Update } from "@/types/update";

export default function ProjectPage({ params }: { params: { id: number } }) {
  console.log(`Render Project: ${params.id}`);

  const [project, setProject] = useState<Project>();
  const [update, setUpdate] = useState<Update>();

  useEffect(() => {
    if (!project || project.updates.length === 0) return;
    const latestUpdate = project.updates[project.updates.length - 1];
    setUpdate(latestUpdate);
  }, [project]);

  useEffect(() => {
    console.log("i fire once");
    ProjectService.getProject(params.id).then((project) => setProject(project));
  }, []);

  return (
    <main className="main">
      <h1>{project?.title}</h1>
      <h2>{project?.description}</h2>
      <article
        className="article"
        dangerouslySetInnerHTML={{ __html: update?.body ?? "" }}
      />
    </main>
  );
}
