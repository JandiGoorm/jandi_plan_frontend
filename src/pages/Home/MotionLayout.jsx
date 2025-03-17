import { sectionVariants } from "./constants";
import styles from "./MotionLayout.module.css";
import { motion } from "framer-motion";

const MotionLayout = ({ children, ...props }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={sectionVariants}
      className={styles.motion_container}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionLayout;
