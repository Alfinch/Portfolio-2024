type EventMap = HTMLBodyElementEventMap & WindowEventMap & DocumentEventMap;

type TypedEventListener<T extends Event> = (this: HTMLElement, evt: T) => void;

export type EventBindings = [
  EventTarget,
  { [K in keyof EventMap]?: TypedEventListener<EventMap[K]> }
][];

export default abstract class EventService {
  static bindEvents(bindings: EventBindings) {
    bindings.forEach(([target, listeners]) =>
      Object.keys(listeners).forEach((type) => {
        const listener = listeners[type as keyof EventMap] as EventListener;
        target.addEventListener(type, listener);
      })
    );
  }

  static unbindEvents(bindings: EventBindings) {
    bindings.forEach(([target, listeners]) =>
      Object.keys(listeners).forEach((type) => {
        const listener = listeners[type as keyof EventMap] as EventListener;
        target.removeEventListener(type, listener);
      })
    );
  }
}
