import { MEDIA_URL } from "@/config";
import styles from "./header.module.css";

export default function LayoutButton({
  children,
  title,
  subtitle,
  image,
}: {
  children?: React.ReactNode;
  title: string;
  subtitle: string;
  image?: string;
}) {
  const headerStyle = image
    ? { "--background-image": `url('${MEDIA_URL}/${image}.jpg')` }
    : {};

  return (
    <div
      className={`${styles.header} ${image ? styles.withImage : null}`}
      style={headerStyle as React.CSSProperties}
    >
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <div className={styles.children}>{children}</div>
    </div>
  );
}
