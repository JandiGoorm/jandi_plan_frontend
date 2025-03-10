import styles from "./SearchTooltip.module.css";

const SearchTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { searchCount, likeCount } = payload[0].payload;

    return (
      <div
        className={`custom-tooltip ${styles.tooltip}`}
        style={{
          backgroundColor: `var(--color-white)`,
          padding: "1rem",
          borderRadius: "var(--radius-md)",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <p className={styles.tooltip_title}>{label}</p>
        <div className={styles.label_box}>
          <p className={styles.label_title}>검색수</p>
          <p className={styles.label_value}>{searchCount}회</p>
        </div>
        <div className={styles.label_box}>
          <p className={styles.label_title}>좋아요</p>
          <p className={styles.label_value}>{likeCount}회</p>
        </div>
      </div>
    );
  }
};

export default SearchTooltip;
