import styles from "./ContactIconBox.module.css";
import { FaGithub, FaBlog } from "react-icons/fa";

const ContactIconBox = ({ github, blog, name }) => {
  return (
    <div className={styles.container}>
      <span className={styles.name}>{name}</span>
      <div className={styles.iconContainer}>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
        >
          <FaGithub className={styles.icon} />
        </a>

        {blog && (
          <a
            href={blog}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <FaBlog className={styles.icon} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactIconBox;
