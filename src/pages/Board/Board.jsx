import { Button, Input, Loading, Pagination } from "@/components";
import { PageEndPoints } from "@/constants";
import { useCommunity } from "@/hooks";
import { usePagination } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Board.module.css";
import BoardItem from "./BoardItem";
import { FiSearch } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchBoardScheme } from "./constants";

const BoardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "BOTH";

  const navigate = useNavigate();
  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();

  const { communities, fetchCommunities, communitiesLoading } = useCommunity();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(searchBoardScheme),
  });

  const onSubmit = (data) => {
    const searchKeyword = data.keyword;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    newSearchParams.set("keyword", searchKeyword);
    setSearchParams(newSearchParams);

    fetchCommunities({ page: currentPage - 1, keyword, category }).then((res) =>
      setTotalPage(res.data.pageInfo.totalPages || 0)
    );
  };

  useEffect(() => {
    clearErrors();
    fetchCommunities({ page: currentPage - 1, keyword, category }).then((res) =>
      setTotalPage(res.data.pageInfo.totalPages || 0)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearErrors, currentPage, fetchCommunities, keyword, setTotalPage]);

  return (
    <BaseLayout>
      {communitiesLoading && <Loading />}
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <p>잡담부터 정보까지 !</p>

            <Button
              variant="solid"
              onClick={() => navigate(PageEndPoints.BOARD_WRITE)}
              size="sm"
            >
              게시글 작성하기
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
                <option value="CONTENT">내용</option>
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
                <FiSearch size={22} />
              </button>
            </form>

            {errors.keyword && (
              <p className={styles.error_message}>{errors.keyword.message}</p>
            )}
          </div>
        </div>

        <ul className={styles.content_list}>
          {communities?.items.map((item) => {
            return <BoardItem item={item} key={item.postId} />;
          })}
        </ul>

        <div className={styles.pagination}>
          <Pagination
            callback={handlePageChange}
            currentPage={currentPage}
            totalPage={totalPage}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default BoardPage;
