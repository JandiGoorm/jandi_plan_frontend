import { Button, Input, Loading, Pagination, PlanCard } from "@/components";
import { PageEndPoints } from "@/constants";
import { usePagination, usePlans } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { searchPlansScheme } from "../constants";
import styles from "./PlanList.module.css";

const PlanList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useLocation();
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "BOTH";
  const [fetchUrl, setFetchUrl] = useState(state?.fetchUrl || null);

  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const { plans, fetchPlans, userPlans, fetchUserPlans, getLoading } = usePlans();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(searchPlansScheme),
  });

  const onSubmit = (data) => {
    const searchKeyword = data.keyword;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    newSearchParams.set("keyword", searchKeyword);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    clearErrors();
    console.log(fetchUrl);

    if(fetchUrl==="main"){
      fetchPlans({ page: currentPage - 1, keyword, category }).then((res) =>
        setTotalPage(res.data.pageInfo.totalPages || 0)
      );
    }else{
      fetchUserPlans(fetchUrl, {page: currentPage - 1}).then((res) =>{
        setTotalPage(res.data.pageInfo.totalPages || 0)
      });
      
    }
  }, [category, clearErrors, currentPage, fetchPlans, keyword, setTotalPage, fetchUrl]);

  if (getLoading) return <Loading />;
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

          {!userPlans && 
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
          }
        </div>

        <div className={styles.plan_container}>
          {plans?.items.map((item) => (
            <PlanCard key={item.tripId} item={item} />
          ))}
          {userPlans?.items.map((item) => (
            <PlanCard key={item.tripId} item={item} />
          ))}
        </div>

        <div className={styles.footer}>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            callback={handlePageChange}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default PlanList;
