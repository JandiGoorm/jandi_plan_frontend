import styles from "./PlanList.module.css";
import { useEffect, useState } from "react";
import { BaseLayout } from "@/layouts";
import { Button, Loading, Pagination, PlanCard, Input } from "@/components";
import { useAxios, usePagination, usePlans } from "@/hooks";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { searchPlansScheme } from "../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const PlanList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "BOTH";
  const [count, setCount] = useState();
  const { currentPage, totalPage, setTotalPage, handlePageChange } = usePagination();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(searchPlansScheme),
  });
  const {plans, fetchPlans, getLoading} = usePlans();

  const onSubmit = (data) => {
    const searchKeyword = data.keyword;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    newSearchParams.set("keyword", searchKeyword);
    setSearchParams(newSearchParams);

    // fetchPlans(
    //   { page: currentPage - 1, keyword, category },
    //   setCount,
    //   setTotalPage
    // );
  };

  useEffect(() => {
    clearErrors();
    fetchPlans(
      { page: currentPage - 1, keyword, category},
      setCount,
      setTotalPage
    );
  }, [clearErrors, currentPage, keyword, setTotalPage]);

  return (
    <BaseLayout>
      {getLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.header_title}>
              <p className={styles.title}>이런 여행 일정은 어때요?</p>
              <Button
                variant={"solid"}
                size = "sm"
                onClick={() => navigate(PageEndPoints.PLAN_CREATE)}
              >
                계획 만들기
              </Button>
            </div>

            <div className={styles.flex_column}>
              <form
                className={styles.search_input}
                onSubmit={handleSubmit(onSubmit)}
              >
                <select
                  className={styles.select}
                  onChange={(e) => {
                    const newSearchParams = new URLSearchParams(searchParams);
                    newSearchParams.set("category", e.target.value);
                    setSearchParams(newSearchParams);
                  }}
                >
                  <option value="BOTH">전체</option>
                  <option value="TITLE">제목</option>
                  <option value="CITY">도시</option>
                </select>
                <Input
                  size="md"
                  style={{
                    border: "none",
                    width: "100%",
                    color: "var(--text-primary)",
                    backgroundColor: "var(--color-bg-primary)",
                  }}
                  placeholder="Search ..."
                  register={register}
                  name="keyword"
                />

                <button type="submit" className={styles.search_btn}>
                  <FiSearch size={24} />
                </button>
              </form>

              {errors.keyword && (
                <p className={styles.error_message}>{errors.keyword.message}</p>
              )}
            </div>
          </div>

          {plans && (
            <div className={styles.plan_container}>
              {plans.items.map((item) => (
                <PlanCard key={item.tripId} item={item} />
              ))}
            </div>
          )}

          <div className={styles.footer}>
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              callback={handlePageChange}
            />
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default PlanList;
