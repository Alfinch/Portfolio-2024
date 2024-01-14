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
      return Matter.Bodies.rectangle(x, y, 77.1, 77.1, options);
    case ShapeType.pentagon:
      return Matter.Bodies.polygon(x, y, 5, 50, options);
    case ShapeType.hexagon:
      return Matter.Bodies.polygon(x, y, 6, 48, options);
    case ShapeType.rectangle:
      return Matter.Bodies.rectangle(x + 50, y, 154.2, 38.55, options);
    case ShapeType.circle:
      return Matter.Bodies.circle(x, y, 43.5, options, 256);
    default:
      throw new Error(`Unsupported shape "${ShapeType[shape]}"`);
  }
}
