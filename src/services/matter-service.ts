import Matter, {
  Bodies,
  Body,
  Composite,
  Engine,
  Gravity,
  IEngineDefinition,
  IMouseConstraintDefinition,
  Mouse,
  MouseConstraint,
  Sleeping,
  World,
} from "matter-js";

export default class MatterService {
  private _engine: Engine;
  get engine(): Engine {
    return this._engine;
  }

  get gravity(): Gravity {
    return this.engine.gravity;
  }

  get world(): World {
    return this.engine.world;
  }

  constructor(options?: IEngineDefinition) {
    this._engine = Engine.create({
      ...{ enableSleeping: true },
      ...options,
    });
  }

  addBody(x: number, y: number): Body {
    const options = {
      restitution: 0.8,
    };

    var body = Bodies.circle(x, y, 44, options, 256);

    Composite.add(this.world, body);
    return body;
  }

  removeBody(body: Body) {
    Composite.remove(this.world, body);
  }

  addMouseConstraint(
    element: HTMLElement,
    options?: IMouseConstraintDefinition
  ) {
    const mouse = Mouse.create(element);
    const mouseConstraint = MouseConstraint.create(this.engine, {
      ...{ mouse },
      ...options,
    });
    Composite.add(this.world, mouseConstraint);
  }

  private isStarted = false;
  start() {
    console.debug("Matter start");
    this.isStarted = true;
    const updateOnNextFrame = () => {
      window.requestAnimationFrame(() => {
        if (this.isStarted) {
          this.update();
          updateOnNextFrame();
        }
      });
    };
    updateOnNextFrame();
  }

  stop() {
    console.debug("Matter stop");
    this.isStarted = false;
  }

  private previousUpdate: number = performance.now();
  private previousDelta: number | null = null;
  update() {
    console.debug("Matter update");
    const update = performance.now();
    const delta = update - this.previousUpdate;
    const correction =
      this.previousDelta == null ? 1 : delta / this.previousDelta;
    Engine.update(this.engine, delta, correction);
    this.previousUpdate = update;
    this.previousDelta = delta;
  }

  private bounds: Body[] = [];
  setBounds(width: number, height: number) {
    const BOUNDS_WIDTH = 9999;
    const options = { isStatic: true };
    Composite.remove(this.world, this.bounds);
    this.bounds = [
      /* top */ Bodies.rectangle(
        /* x */ width / 2,
        /* y */ -BOUNDS_WIDTH / 2,
        /* w */ width + BOUNDS_WIDTH * 2,
        /* h */ BOUNDS_WIDTH,
        options
      ),
      /* right */ Bodies.rectangle(
        /* x */ width + BOUNDS_WIDTH / 2,
        /* y */ height / 2,
        /* w */ BOUNDS_WIDTH,
        /* h */ height + BOUNDS_WIDTH * 2,
        options
      ),
      /* bottom */ Bodies.rectangle(
        /* x */ width / 2,
        /* y */ height + BOUNDS_WIDTH / 2,
        /* w */ width + BOUNDS_WIDTH * 2,
        /* h */ BOUNDS_WIDTH,
        options
      ),
      /* left */ Bodies.rectangle(
        /* x */ -BOUNDS_WIDTH / 2,
        /* y */ height / 2,
        /* w */ BOUNDS_WIDTH,
        /* h */ height + BOUNDS_WIDTH * 2,
        options
      ),
    ];
    Composite.add(this.world, this.bounds);
    this.wake();
  }

  setGravity(x: number, y: number) {
    switch (this.orientation) {
      case 90:
        [x, y] = [y, -x];
        break;
      case 180:
        [x, y] = [-x, -y];
        break;
      case 270:
        [x, y] = [-y, x];
        break;
    }
    this.gravity.x = x;
    this.gravity.y = y;
    this.wake();
  }

  private orientation: number = 0;
  setOrientation(orientation: number) {
    orientation = (360 + orientation) % 360;
  }

  destroy() {
    this.stop();
    World.clear(this.world, false);
    Engine.clear(this.engine);
  }

  private wake() {
    this.world.bodies.forEach((b) => b.isSleeping && Sleeping.set(b, false));
  }
}
