import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./PreferenceLayout.module.css";
import Continent from "./Continent/Continent";
import PrefDestination from "./Destination/PrefDestination";

const PreferenceLayout = () => {
    const location = useLocation();

    return(
        <div className={styles.container}>
             <AnimatePresence mode="wait">
                <motion.div 
                    key={location.pathname}
                    className={styles.content}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.5 }}
                >
                        <Routes location={location}>
                            <Route path="continent"  element={<Continent />} />
                            <Route path="destination"  element={<PrefDestination />} />
                        </Routes>
                </motion.div>
            </AnimatePresence>
        </div>
    );

};

export default PreferenceLayout;