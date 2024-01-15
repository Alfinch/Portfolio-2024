import Matter from "matter-js";
import { ShapeType } from "./shape-type";

export type HomeItemShape = {
  key: string;
  x: number;
  y: number;
  body: Matter.Body;
  type: ShapeType;
};
