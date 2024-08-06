import { Update } from "./update";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  firstUpdated: Date;
  lastUpdated: Date;
  updates: Update[];
}
