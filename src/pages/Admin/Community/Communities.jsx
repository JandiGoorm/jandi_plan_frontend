import {
  Button,
  Modal,
  ModalContent,
  ModalTrigger,
  Pagination,
} from "@/components";
import styles from "./Communities.module.css";
import { useCommunity, usePagination } from "@/hooks";
import { useCallback, useEffect } from "react";
import { formatDate } from "date-fns";
import DeleteModal from "@/components/Modal/ModalContents/DeleteModal";
import { buildPath } from "@/utils";
import { PageEndPoints } from "@/constants";
import { useNavigate } from "react-router-dom";

const Communities = ({ set }) => {
  const navigate = useNavigate();
  const { fetchCommunities, communities, deleteCommunity } = useCommunity();

  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination("community");

  const handleViewClick = useCallback(
    (id) => {
      const path = buildPath(PageEndPoints.BOARD_DETAIL, { id });
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    fetchCommunities({ page: currentPage - 1 }, setTotalPage);
  }, [currentPage, fetchCommunities, setTotalPage]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>커뮤니티 글 관리</p>
        <Button size="sm" variant="ghost" onClick={set}>
          신고된 게시글
        </Button>
      </div>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>제목</th>
              <th>작성자ID</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>좋아요 수</th>
              <th>댓글 수</th>
              <th className={styles.action_title}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {communities?.items.map((community) => {
              const date = formatDate(
                new Date(community.createdAt),
                "yyyy. MM. dd"
              );
              return (
                <tr key={community.postId}>
                  <td>{community.postId}</td>
                  <td>{community.title}</td>
                  <td>{community.user.userId}</td>
                  <td>{date}</td>
                  <td>{community.viewCount}</td>
                  <td>{community.likeCount}</td>
                  <td>{community.commentCount}</td>
                  <td className={styles.actions}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleViewClick(community.postId)}
                    >
                      View
                    </Button>
                    <Modal>
                      <ModalTrigger>
                        <Button size="sm" variant="ghost">
                          Delete
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <DeleteModal
                          callback={() => deleteCommunity(community.postId)}
                        />
                      </ModalContent>
                    </Modal>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <Pagination
          callback={handlePageChange}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default Communities;
