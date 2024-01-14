import Matter from "matter-js";

const BOUNDS_WIDTH = 1000;

export default function getWorldBounds(width: number, height: number) {
  const options = { isStatic: true };
  return [
    /* top */ Matter.Bodies.rectangle(
      /* x */ width / 2,
      /* y */ -BOUNDS_WIDTH / 2,
      /* w */ width + BOUNDS_WIDTH * 2,
      /* h */ BOUNDS_WIDTH,
      options
    ),
    /* right */ Matter.Bodies.rectangle(
      /* x */ width + BOUNDS_WIDTH / 2,
      /* y */ height / 2,
      /* w */ BOUNDS_WIDTH,
      /* h */ height + BOUNDS_WIDTH * 2,
      options
    ),
    /* bottom */ Matter.Bodies.rectangle(
      /* x */ width / 2,
      /* y */ height + BOUNDS_WIDTH / 2,
      /* w */ width + BOUNDS_WIDTH * 2,
      /* h */ BOUNDS_WIDTH,
      options
    ),
    /* left */ Matter.Bodies.rectangle(
      /* x */ -BOUNDS_WIDTH / 2,
      /* y */ height / 2,
      /* w */ BOUNDS_WIDTH,
      /* h */ height + BOUNDS_WIDTH * 2,
      options
    ),
  ];
}
