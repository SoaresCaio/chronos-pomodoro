import styles from "./styles.module.css";

type HeadingProps = {
  children: React.ReactNode;
  // You can add more props if needed, like className, style, etc.
};
export function Heading({ children }: HeadingProps) {
  return <h1 className={styles.heading}>{children}</h1>;
}
