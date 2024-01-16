import Matter from "matter-js";
import { ShapeType } from "./shape-type";

export type HomeItemShapeConfig = {
  url: string;
  image: string;
}

export type HomeItemShape = HomeItemShapeConfig & {
  key: string;
  x: number;
  y: number;
  body: Matter.Body;
  type: ShapeType;
};
