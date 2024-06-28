import { Update } from "./update";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: Date;
  updates: Update[];
}
