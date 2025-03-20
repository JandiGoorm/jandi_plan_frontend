import styles from "./TechStack.module.css";
import { libs } from "./libs";

const TechStack = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Stack</h3>
      <div className={styles.content}>
        {libs.map((data, index) => (
          <div className={styles.section} key={`${data.head}_${index}`}>
            <h4 className={styles.subHeading}>{data.head}</h4>
            <div className={styles.libraryContainer}>
              {data.libraries.map((lib, i) => (
                <a
                  key={`${data.head}_lib_${i}`}
                  href={lib.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.libraryLink}
                >
                  {lib.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
