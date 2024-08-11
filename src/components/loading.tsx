import styles from "./loading.module.css";

interface LoadingProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function Loading({ children, isLoading }: LoadingProps) {
  return isLoading ? (
    <p className={styles.loading}>Loading...</p>
  ) : (
    <>{children}</>
  );
}
