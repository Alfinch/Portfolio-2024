import { Viewport } from "next";
import { Metadata } from "next";
import "./globals.css";
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
    <html lang="en">
      <body>
        <div className={styles.layout}>
          <div className={styles.sidePanel}></div>
          {children}
          <div className={styles.sidePanel}></div>
        </div>
      </body>
    </html>
  );
}
