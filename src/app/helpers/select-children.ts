import { ReactElement, ReactNode, isValidElement } from "react";
import isIterable from "./is-iterable";

export function selectChildren(
  node: ReactNode,
  selector: (element: ReactElement) => boolean
): ReactElement[] {
  if (isValidElement(node) && selector(node)) {
    return [node];
  } else if (isIterable(node) && typeof node !== "string") {
    return Array.from(node)
      .map((child) => selectChildren(child, selector))
      .flat()
      .filter((child) => child !== null);
  }
  return [];
}

/** Returns the first matching child. Returns null if there are no matches. */
export function selectFirstChild(
  node: ReactNode,
  selector: (element: ReactElement) => boolean
): ReactElement | null {
  const children = selectChildren(node, selector);
  return children.length === 1 ? children[0] : null;
}

/** Returns a single matching child. Returns null if there are no matches, or more than one match. */
export function selectSingleChild(
  node: ReactNode,
  selector: (element: ReactElement) => boolean
): ReactElement | null {
  const children = selectChildren(node, selector);
  return children.length === 1 ? children[0] : null;
}

export function classSelector(className: string) {
  return (element: ReactElement) => {
    const classNameProp = element.props.className;
    if (classNameProp != null && typeof classNameProp === "string") {
      return classNameProp.split(" ").includes(className);
    }
    return false;
  };
}
