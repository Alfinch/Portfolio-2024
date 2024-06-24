import { Project } from "../types/project";

const api = "https://api.alfiewoodland.com";

export default abstract class ProjectService {
  static async getProject(id: number): Promise<Project> {
    return ProjectService.getJson<Project>(api + "/project/" + id);
  }

  static async getProjects(): Promise<Project[]> {
    return ProjectService.getJson<Project[]>(api + "/projects");
  }

  private static async getJson<T>(url: string): Promise<T> {
    return fetch(url)
      .then((response) => response.text())
      .then((text) => JSON.parse(text, ProjectService.dateTimeReviver));
  }

  private static dateTimeReviver(_key: string, value: unknown) {
    if (typeof value === "string") {
      const date = new Date(value);
      if (!isNaN(date.valueOf())) {
        return date;
      }
    }
    return value;
  }
}
