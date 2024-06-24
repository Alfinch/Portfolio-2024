import { Update } from "./update";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  startDate: Date;
  updates: Update[];
}
