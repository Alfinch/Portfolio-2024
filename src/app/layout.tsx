import { Viewport, Metadata } from "next";
import "../styles/globals.css";
import styles from "./layout.module.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `Alfie Woodland's personal website`,
  description: `A collection of projects and ponderings created by Alfie Woodland`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={styles.html}>
      <body className={styles.body}>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
