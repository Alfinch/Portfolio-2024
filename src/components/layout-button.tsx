import { selectChildren, classSelector } from "../helpers/select-children";
import styles from "./layout-button.module.css";

export default function LayoutButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={styles.layoutButton + (active ? " " + styles.active : "")}
      onClick={onClick}
    >
      <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <g className={styles.background}>
          {selectChildren(children, classSelector("bg"))}
        </g>
        <g className={styles.foreground}>
          {selectChildren(children, classSelector("fg"))}
        </g>
      </svg>
    </button>
  );
}
