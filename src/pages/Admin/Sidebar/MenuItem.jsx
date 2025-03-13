import { TiArrowSortedDown } from "react-icons/ti";
import styles from "./MenuItem.module.css";
import { RxDotFilled } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { buildPath } from "@/utils";
import { adminEndpoint } from "./constants";

const MenuItem = ({ item, isOpen, onClick }) => {
  const { label, icon, subItems } = item;
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (id) => {
      const path = buildPath(adminEndpoint, { id });
      navigate(path);
    },
    [navigate]
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.menu_item}
        onClick={() => (subItems ? onClick(item.id) : handleNavigate(item.id))}
      >
        <div className={styles.icon_wrapper}>{icon}</div>
        <p>{label}</p>

        {subItems && (
          <div className={styles.arrow_icon}>
            <TiArrowSortedDown
              size={16}
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {subItems && isOpen && (
          <motion.div
            className={`${styles.sub_menu} ${isOpen ? styles.open : ""}`}
            key={item.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {subItems.map((subItem) => (
              <div
                key={subItem.id}
                className={styles.sub_menu_item}
                onClick={() => handleNavigate(subItem.id)}
              >
                <div className={styles.icon_wrapper}>
                  <RxDotFilled />
                </div>
                <p>{subItem.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuItem;
