import { Viewport, Metadata } from "next";
import "../styles/globals.css";
import styles from "./layout.module.css";
import Head from "next/head";
import { CSP } from "@/config";

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
      <Head>
        <meta http-equiv="Content-Security-Policy" content={CSP} />
      </Head>
      <body className={styles.body}>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
