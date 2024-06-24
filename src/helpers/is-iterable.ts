import isObject from "./is-object";

export default function isIterable<T>(
  value: T | Iterable<T>
): value is Iterable<T> {
  return isObject(value) && Symbol.iterator in value;
}
