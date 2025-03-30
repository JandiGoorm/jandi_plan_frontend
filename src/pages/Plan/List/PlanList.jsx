import {
  Button,
  EmptyItem,
  Input,
  Loading,
  Pagination,
  PlanCard,
} from "@/components";
import { PageEndPoints } from "@/constants";
import { usePagination, usePlans } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchPlansScheme } from "../constants";
import styles from "./PlanList.module.css";
import { buildPath } from "@/utils";

const PlanList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "BOTH";

  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const { plans, fetchPlans, getLoadings } = usePlans();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(searchPlansScheme),
  });

  const handleNavigate = useCallback(
    (id) => {
      const path = buildPath(PageEndPoints.PLAN_DETAIL, { id });
      navigate(path);
    },
    [navigate]
  );

  const onSubmit = (data) => {
    const searchKeyword = data.keyword;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    newSearchParams.set("keyword", searchKeyword);
    setSearchParams(newSearchParams);

    fetchPlans({
      page: currentPage - 1,
      keyword: searchKeyword,
      category,
    }).then((res) => setTotalPage(res.data.pageInfo.totalPages || 0));
  };

  useEffect(() => {
    clearErrors();
    fetchPlans({ page: currentPage - 1, keyword, category }).then((res) =>
      setTotalPage(res.data.pageInfo.totalPages || 0)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPlans, currentPage, keyword, category]);

  if (getLoadings) return <Loading />;
  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <p className={styles.title}>이런 여행 일정은 어때요?</p>
            <Button
              variant={"solid"}
              size="sm"
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
                defaultValue={category}
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

        {plans && plans.items.length > 0 ? (
          <>
            <div className={styles.plan_container}>
              {plans.items.map((item) => (
                <div
                  key={item.tripId}
                  onClick={() => handleNavigate(item.tripId)}
                >
                  <PlanCard item={item} />
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                callback={handlePageChange}
              />
            </div>
          </>
        ) : (
          <EmptyItem parentClassName={styles.empty} />
        )}
      </div>
    </BaseLayout>
  );
};

export default PlanList;
