import { HomeItemShape } from "../types/home-item-shape";
import { ShapeType } from "../types/shape-type";

export default function* getShapes(): Generator<HomeItemShape> {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      yield {
        key: crypto.randomUUID(),
        x: i * 100 + 100,
        y: j * 100 + 100,
        type: [
          ShapeType.square,
          ShapeType.pentagon,
          ShapeType.hexagon,
          ShapeType.rectangle,
          ShapeType.circle,
        ].at(Math.floor(Math.random() * 5)) as ShapeType,
      };
    }
  }
}
