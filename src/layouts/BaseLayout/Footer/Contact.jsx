import styles from "./Contact.module.css";
import ContactIconBox from "./ContactIconBox";

const Contact = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Contact</h3>
      <div className={styles.content}>
        <div className={styles.section}>
          <h4 className={styles.subHeading}>Frontend</h4>
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
          <h4 className={styles.subHeading}>Backend</h4>
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
