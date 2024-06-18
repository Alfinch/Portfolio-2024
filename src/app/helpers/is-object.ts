export default function isObject<T>(value: T | Object): value is Object {
  return (
    value != null && (typeof value === "object" || typeof value === "function")
  );
}
