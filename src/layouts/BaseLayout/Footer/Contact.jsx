import styles from "./Contact.module.css";
import ContactIconBox from "./ContactIconBox";
import { FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Contact</h3>
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.subHeading}>
            <p className={styles.subHeading_text}>Frontend</p>
            <a
              href={"https://github.com/JandiGoorm/jandi_plan_frontend"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <FaGithub className={styles.icon} />
            </a>
          </div>

          <div className={styles.iconBoxContainer}>
            <ContactIconBox
              github="https://github.com/Jun-min-geun"
              blog={null}
              name="Min Geun"
            />
            <ContactIconBox
              github="https://github.com/Yoonhwi"
              blog="https://winhwi.tistory.com/"
              name="Seung Hwi"
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.subHeading}>
            <p className={styles.subHeading_text}>Backend</p>
            <a
              href={"https://github.com/JandiGoorm/jandi_plan_backend"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <FaGithub className={styles.icon} />
            </a>
          </div>
          <div className={styles.iconBoxContainer}>
            <ContactIconBox
              github="https://github.com/kyj0503"
              blog="https://blog.naver.com/kanden9999"
              name="Yeon Jae"
            />
            <ContactIconBox
              github="https://github.com/hhhan-jh"
              blog="https://blog.naver.com/weg1248"
              name="Jeong Hui"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
