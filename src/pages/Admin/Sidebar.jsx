import { sidebarMenu } from "./constants";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <p className={styles.sidebar_title}>관리자 페이지</p>

      <ul>
        {sidebarMenu.map((item) => (
          <li key={item.label}>
            <a href={item.link}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
