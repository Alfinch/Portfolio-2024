import { useState } from "react";
import LayoutButton from "./layout-button";
import styles from "./layout-buttons.module.css";
import { LayoutState } from "../types/layout-state";

export default function LayoutButtons({
  onChange,
}: {
  onChange: (layout: LayoutState) => void;
}) {
  const [layoutState, setLayoutState] = useState(LayoutState.Grid);

  const setLayout = (layout: LayoutState) => {
    setLayoutState(layout);
    onChange(layout);
  };

  return (
    <div className={styles.layoutButtons}>
      <LayoutButton
        active={layoutState === LayoutState.Grid}
        onClick={() => setLayout(LayoutState.Grid)}
      >
        <rect className="bg" width="70" height="70" />
        <rect className="fg" x="10" y="10" width="20" height="20" />
        <rect className="fg" x="40" y="10" width="20" height="20" />
        <rect className="fg" x="10" y="40" width="20" height="20" />
        <rect className="fg" x="40" y="40" width="20" height="20" />
      </LayoutButton>
      <LayoutButton
        active={layoutState === LayoutState.List}
        onClick={() => setLayout(LayoutState.List)}
      >
        <rect className="bg" width="70" height="70" />
        <rect className="fg" x="10" y="10" width="50" height="10" />
        <rect className="fg" x="10" y="30" width="50" height="10" />
        <rect className="fg" x="10" y="50" width="50" height="10" />
      </LayoutButton>
      <LayoutButton
        active={layoutState === LayoutState.Chaos}
        onClick={() => setLayout(LayoutState.Chaos)}
      >
        <circle className="bg" cx="20" cy="20" r="20" />
        <rect
          className="bg"
          x="30"
          y="4"
          width="36"
          height="36"
          transform="rotate(10, 50, 20)"
        />
        <rect
          className="bg"
          x="4"
          y="30"
          width="36"
          height="36"
          transform="rotate(10, 20, 50)"
        />
        <circle className="bg" cx="50" cy="50" r="20" />
        <circle className="fg" cx="20" cy="20" r="10" />
        <rect
          className="fg"
          x="40"
          y="14"
          width="16"
          height="16"
          transform="rotate(10, 50, 20)"
        />
        <rect
          className="fg"
          x="14"
          y="40"
          width="16"
          height="16"
          transform="rotate(10, 20, 50)"
        />
        <circle className="fg" cx="50" cy="50" r="10" />
      </LayoutButton>
    </div>
  );
}
