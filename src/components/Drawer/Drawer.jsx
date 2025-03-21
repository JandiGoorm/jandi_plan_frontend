import { cloneElement, useCallback, useState } from "react";
import styles from "./Drawer.module.css";
import { DrawerContext, useDrawer } from "./DrawerContext";
import { Button } from "@/components";
import { AnimatePresence, motion } from "framer-motion";

const Drawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      <>{children}</>
    </DrawerContext.Provider>
  );
};

const DrawerTrigger = ({ children }) => {
  const { openDrawer } = useDrawer();

  return cloneElement(children, {
    onClick: (event) => {
      if (children.props.onClick) {
        children.props.onClick(event);
      }
      openDrawer();
    },
  });
};

const DrawerContent = ({ children }) => {
  const { isOpen, closeDrawer } = useDrawer();

  const variants = {
    hidden: {
      x: "-100%",
      opacity: 0.5,
    },
    visible: {
      x: "0",
      opacity: 1,
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={styles.container}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={closeDrawer}
            variant="solid"
            style={{ position: "absolute", top: "1rem", right: "1rem" }}
          >
            Close
          </Button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Drawer, DrawerTrigger, DrawerContent };
