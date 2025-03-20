import styles from "./BaseLayout.module.css";
import Footer from "./Footer/Footer";
import Header from "./Header";

const BaseLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.centered}>
        <Header />
        <div className={styles.content}>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default BaseLayout;
