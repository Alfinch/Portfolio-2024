import Matter from "matter-js";

export default function getBody(
  engine: Matter.Engine,
  bounds: DOMRect,
  containerBounds: DOMRect
): Matter.Body {
  const x = bounds.x - containerBounds.x + bounds.width / 2;
  const y = bounds.y - containerBounds.y + bounds.height / 2;

  const options = {
    restitution: 0.8,
  };

  var body = Matter.Bodies.circle(x, y, 44, options, 256);

  Matter.Composite.add(engine.world, body);
  return body;
}
