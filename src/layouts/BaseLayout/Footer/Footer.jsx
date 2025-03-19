import { Modal, ModalContent, ModalTrigger } from "@/components";
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
        <Modal>
          <ModalTrigger>
            <p className={styles.policy}>개인정보처리방침</p>
          </ModalTrigger>
          <ModalContent>
            <div className={styles.policy_container}>
              <img
                src="/information-policy.webp"
                alt="information-policy"
                className={styles.policy_image}
              />
            </div>
          </ModalContent>
        </Modal>
        <p className={styles.title}>© 2025 Groom - Jandi TEAM</p>
      </div>
    </footer>
  );
};

export default Footer;
