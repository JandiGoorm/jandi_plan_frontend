import styles from "./EmptyItem.module.css";

const EmptyItem = ({ parentClassName, imgClassName }) => {
  return (
    <div className={`${styles.container} ${parentClassName}`}>
      <img
        className={`${styles.img} ${imgClassName}`}
        src="/no-items.png"
        alt="no items"
      />
      <p>No items available...</p>
    </div>
  );
};

export default EmptyItem;
