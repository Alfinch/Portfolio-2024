import { Viewport } from "next";
import "./globals.css";
import styles from "./layout.module.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.layout}>
          <div className={styles.sidePanel}></div>
          {children}
          <div className={styles.sidePanel}></div>
        </div>
        <div className={styles.modal}>
          <p className={styles.constructionMessage}>Site under construction</p>
        </div>
      </body>
    </html>
  );
}
