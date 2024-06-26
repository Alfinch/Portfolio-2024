import { selectChildren, classSelector } from "../helpers/select-children";
import styles from "./layout-button.module.css";

export default function LayoutButton({
  children,
  active,
  label,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={"Switch layout to " + label}
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
