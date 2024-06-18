import { Project } from "../types/project";

const api = "https://api.alfiewoodland.com";

export default abstract class ProjectService {
  static async getProject(id: number): Promise<Project> {
    return fetch(api + "/project/" + id).then((response) => response.json());
  }

  static async getProjects(): Promise<Project[]> {
    return await fetch(api + "/projects").then((response) => response.json());
  }
}
