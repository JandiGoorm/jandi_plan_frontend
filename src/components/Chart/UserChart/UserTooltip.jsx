import styles from "./UserTooltip.module.css";

const UserTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const { month, year, value } = payload[0].payload;

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
      <p className={styles.tooltip_title}>{`${year} ${month}`}</p>
      <div className={styles.label_box}>
        <p className={styles.label_title}>가입자</p>
        <p className={styles.label_value}>{value}명</p>
      </div>
    </div>
  );
};

export default UserTooltip;
