import { Input, Button } from "@/components";
import { BaseLayout } from "@/layouts";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SearchDetail from "./Detail/SearchDetail";
import SearchMain from "./Main/SearchMain";
import styles from "./SearchLayout.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchScheme } from "./constants";

const SearchLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(searchScheme),
  });

  const handleSearch = useCallback(
    (data) => {
      const keyword = data.keyword.trim();

      if (keyword) {
        navigate(`?keyword=${keyword}`);
      }
    },
    [navigate]
  );

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.search_field}>
          <div className={styles.search_container}>
            <form
              className={styles.search_input}
              onSubmit={handleSubmit(handleSearch)}
            >
              <Input
                size="lg"
                placeholder="Search topics ..."
                style={{
                  width: "100%",
                  borderRadius: "28px",
                  padding: "0.7rem 4rem 0.7rem 1.5rem",
                  boxSizing: "border-box",
                }}
                register={register}
                name="keyword"
              />

              <div className={styles.icon_search_box}>
                <Button variant="none" type="submit">
                  <FiSearch size={24} className={styles.icon_search} />
                </Button>
              </div>
            </form>
          </div>

          {errors.keyword && (
            <p className={styles.error_message}>{errors.keyword.message}</p>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname + location.search}
            className={styles.content}
            initial={{ opacity: 0, x: "-10%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "10%" }}
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
