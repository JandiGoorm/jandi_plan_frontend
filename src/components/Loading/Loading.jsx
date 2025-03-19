import styles from "./Loading.module.css";

const Loading = ({ isSection = false, ...props }) => {
  return (
    <div
      className={isSection ? styles.section_container : styles.container}
      {...props}
    >
      <div className={styles.spinner} />
    </div>
  );
};

export default Loading;
