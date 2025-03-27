import { useState } from "react";
import styles from "./ImageWithPlaceholder.module.css";

const ImageWithPlaceholder = ({
  src,
  alt,
  className,
  placeholderClassName,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.container}>
      {!loaded && (
        <div
          className={`${styles.placeholder} ${placeholderClassName}`}
          aria-hidden="true"
        />
      )}

      <img
        style={{ display: loaded ? "block" : "none" }}
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
