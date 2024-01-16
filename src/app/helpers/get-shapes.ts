import { HomeItemShape, HomeItemShapeConfig } from "../types/home-item-shape";
import { ShapeType } from "../types/shape-type";
import getBody from "./get-body";

const ROWS = 3;

export default function getShapes(
  config: HomeItemShapeConfig[]
): HomeItemShape[] {
  return config.map((c, i) => {
    const x = (i % ROWS) * 100 + 50;
    const y = Math.floor(i / ROWS) * 100 + 50;
    const type = [
      ShapeType.square,
      ShapeType.circle,
      ShapeType.pentagon,
      ShapeType.hexagon,
    ][i % 4] as ShapeType;
    return {
      ...c,
      key: crypto.randomUUID(),
      x,
      y,
      body: getBody(type, x, y),
      type,
    };
  });
}
