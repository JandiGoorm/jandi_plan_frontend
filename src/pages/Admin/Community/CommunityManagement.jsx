import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Communities from "./Communities";
import styles from "./CommunityManagement.module.css";
import ReportedCommunities from "./ReportedCommunities";

const CommunityManagement = () => {
  const [isReortedView, setIsReportedView] = useState(false);
  const transeX = isReortedView ? 100 : -100;

  return (
    <div className={styles.container} id="community">
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
            <ReportedCommunities set={() => setIsReportedView(false)} />
          ) : (
            <Communities set={() => setIsReportedView(true)} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CommunityManagement;
