import Contact from "./Contact";
import styles from "./Footer.module.css";
import TechStack from "./TechStack";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Contact />
        <TechStack />
      </div>

      <div className={styles.notice_container}>
        <p className={styles.policy}>이용정책</p>
        <p className={styles.policy}>개인정보처리방침</p>
        <p className={styles.title}>© 2025 Groom - Jandi TEAM</p>
      </div>
    </footer>
  );
};

export default Footer;
