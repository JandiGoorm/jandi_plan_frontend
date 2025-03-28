import { useCallback, useState } from "react";
import { menuData } from "./constants";
import MenuItem from "./MenuItem";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";

const Sidebar = () => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const navigate = useNavigate();

  const handleMenuClick = useCallback((id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className={styles.sidebar}>
      <p
        className={styles.sidebar_title}
        onClick={() => navigate(PageEndPoints.HOME)}
      >
        Just Plan it !
      </p>

      <div className={styles.menu_container}>
        {menuData.map((item) => {
          return (
            <MenuItem
              key={item.id}
              item={item}
              isOpen={openMenuId === item.id}
              onClick={handleMenuClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
