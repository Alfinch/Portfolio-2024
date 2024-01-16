import Matter from "matter-js";
import { ShapeType } from "../types/shape-type";

export default function getBody(
  shape: ShapeType,
  x: number,
  y: number
): Matter.Body {
  const options = {
    friction: 0.1,
    frictionAir: 0,
    restitution: 0.8,
  };

  switch (shape) {
    case ShapeType.square:
      return Matter.Bodies.rectangle(x, y, 78, 78, options);
    case ShapeType.pentagon:
      return Matter.Bodies.fromVertices(
        x,
        y,
        [
          [
            { x: 79.39, y: 90.45 },
            { x: 20.61, y: 90.45 },
            { x: 2.45, y: 34.55 },
            { x: 50.0, y: 0.0 },
            { x: 97.55, y: 34.55 },
          ],
        ],
        options
      );
    case ShapeType.hexagon:
      return Matter.Bodies.fromVertices(
        x,
        y,
        [
          [
            { x: 97.83, y: 50.0 },
            { x: 73.92, y: 91.42 },
            { x: 26.08, y: 91.42 },
            { x: 2.17, y: 50.0 },
            { x: 26.08, y: 8.58 },
            { x: 73.92, y: 8.58 },
          ],
        ],
        options
      );
    case ShapeType.circle:
      return Matter.Bodies.circle(x, y, 44, options, 256);
    default:
      throw new Error(`Unsupported shape "${ShapeType[shape]}"`);
  }
}
