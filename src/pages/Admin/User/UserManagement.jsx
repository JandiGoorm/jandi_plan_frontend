import styles from "./UserManagement.module.css";
import UserAll from "./UserAll";
import { useState } from "react";
import ReportedUser from "./ReportedUser";
import { AnimatePresence, motion } from "framer-motion";

const UserManagement = () => {
  const [isReortedView, setIsReportedView] = useState(false);
  const transeX = isReortedView ? 100 : -100;

  return (
    <div className={styles.container} id="users">
      <AnimatePresence mode="wait">
        <motion.div
          key={isReortedView}
          initial={{ opacity: 0, x: transeX }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: transeX }}
          transition={{ duration: 0.5 }}
          style={{ height: "100%" }}
        >
          {isReortedView ? (
            <ReportedUser set={() => setIsReportedView(false)} />
          ) : (
            <UserAll set={() => setIsReportedView(true)} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
