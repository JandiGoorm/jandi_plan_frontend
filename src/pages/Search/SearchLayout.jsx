import { Input } from "@/components";
import { BaseLayout } from "@/layouts";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SearchDetail from "./Detail/SearchDetail";
import SearchMain from "./Main/SearchMain";
import styles from "./SearchLayout.module.css";

const SearchLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");

  const exitTransitionX = keyword ? "50%" : "-50%";

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const keyword = e.target[0].value;
      e.target[0].value = "";

      if (keyword) {
        navigate(`?keyword=${keyword}`);
      }
    },
    [navigate]
  );

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.search_container}>
          <form className={styles.search_input} onSubmit={handleSearch}>
            <Input
              size="lg"
              placeholder="Search topics ..."
              style={{
                width: "100%",
                borderRadius: "28px",
                padding: "0.7rem 4rem 0.7rem 1.5rem",
                boxSizing: "border-box",
              }}
            />

            <div className={styles.icon_search_box}>
              <FiSearch
                size={24}
                className={styles.icon_search}
                type="submit"
              />
            </div>
          </form>

          {/* <div className={styles.search_recommend}>
            <p>Recommend : </p>
            <span>방콕</span>
            <span>오사카</span>
            <span>괌</span>
          </div> */}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname + location.search}
            className={styles.content}
            initial={{ opacity: 0, x: exitTransitionX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: exitTransitionX }}
            transition={{ duration: 0.5 }}
          >
            <Routes location={location}>
              <Route
                path="*"
                element={
                  keyword ? <SearchDetail keyword={keyword} /> : <SearchMain />
                }
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </BaseLayout>
  );
};

export default SearchLayout;
