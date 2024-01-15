import { HomeItemShape } from "../types/home-item-shape";
import { ShapeType } from "../types/shape-type";
import getBody from "./get-body";

export default function getShapes(): HomeItemShape[] {
  const shapes = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      const x = i * 100 + 50;
      const y = j * 100 + 50;
      const type = [
        ShapeType.square,
        ShapeType.pentagon,
        ShapeType.hexagon,
        ShapeType.rectangle,
        ShapeType.circle,
      ][(i + j) % 5] as ShapeType;
      shapes.push({
        key: crypto.randomUUID(),
        x,
        y,
        body: getBody(type, x, y),
        type,
      });
    }
  }
  return shapes;
}
