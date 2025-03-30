import {
  Button,
  ImageWithPlaceholder,
  Input,
  Loading,
  Pagination,
} from "@/components";
import styles from "./Comment.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAxios, usePagination } from "@/hooks";
import CommentItem from "./CommentItem";
import { buildPath } from "@/utils";
import { APIEndPoints } from "@/constants";
import { useAuth, useToast } from "@/contexts";

const Comment = ({ id }) => {
  const [items, setItems] = useState();
  const ref = useRef(null);

  const { loading, fetchData, response } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();
  const { fetchData: fetchApi } = useAxios();

  const { currentPage, totalPage, setTotalPage, handlePageChange } =
    usePagination();
  const { user } = useAuth();
  const { createToast } = useToast();

  const fetchComments = useCallback(async () => {
    const navigatePage = Math.max(
      1,
      currentPage > totalPage ? totalPage : currentPage
    );

    await fetchData({
      url: buildPath(APIEndPoints.COMMUNITY_COMMENTS, { id }),
      method: "GET",
      params: {
        page: navigatePage - 1,
      },
    }).then((res) => {
      setTotalPage(res.data.pageInfo.totalPages);
      const itemsWithMine = res.data.items.map((comment) => ({
        ...comment,
        mine: comment.user.userId === user?.userId,
      }));

      setItems(itemsWithMine);
    });
  }, [currentPage, fetchData, id, setTotalPage, totalPage, user?.userId]);

  const addComment = useCallback(() => {
    const text = ref.current.value;

    if (text === "" || text === null) {
      createToast({
        type: "error",
        text: "댓글 내용을 입력해주세요",
      });
    } else {
      postApi({
        method: "POST",
        url: buildPath(APIEndPoints.COMMUNITY_COMMENTS, { id }),
        data: {
          contents: text,
        },
      })
        .then(() => {
          ref.current.value = "";
          fetchComments();
          createToast({
            type: "success",
            text: "댓글이 등록되었습니다",
          });
        })
        .catch(() => {
          createToast({
            type: "error",
            text: "댓글 등록에 실패하였습니다",
          });
        });
    }
  }, [createToast, fetchComments, id, postApi]);

  const deleteComment = useCallback(
    (id) => {
      deleteApi({
        method: "DELETE",
        url: buildPath(APIEndPoints.COMMUNITY_COMMENTS, { id }),
      })
        .then(() => {
          fetchComments();
          createToast({
            type: "success",
            text: "댓글이 삭제되었습니다",
          });
        })
        .catch(() =>
          createToast({
            type: "error",
            text: "댓글 삭제에 실패하였습니다",
          })
        );
    },
    [createToast, deleteApi, fetchComments]
  );

  const handleLike = useCallback(
    (id, liked) => {
      let method = "";
      if (liked) {
        method = "DELETE";
      } else {
        method = "POST";
      }
      fetchApi({
        method: method,
        url: buildPath(APIEndPoints.COMMENTS_LIKE, { id }),
      })
        .then(() => {
          fetchComments();
        })
        .catch(() =>
          createToast({
            type: "error",
            text: "좋아요 설정에 실패하였습니다",
          })
        );
    },
    [createToast, fetchApi, fetchComments]
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments, id]);

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.comment_count}>
          댓글 {response?.pageInfo?.totalSize} 개
        </p>

        <form
          className={styles.form_box}
          onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }}
        >
          <div className={styles.user_img_box}>
            <ImageWithPlaceholder
              src={user?.profileImageUrl}
              alt="user profile"
            />
          </div>

          <Input
            placeholder="댓글을 입력해주세요."
            ref={ref}
            style={{
              borderRadius: "var(--radius-3xl)",
              padding: "0.8rem 1rem",
              flex: 1,
            }}
          />

          <Button
            variant="ghost"
            size="md"
            type="submit"
            style={{
              whiteSpace: "nowrap",
            }}
          >
            등록
          </Button>
        </form>
      </div>

      <div className={styles.comment_container}>
        {items?.map((comment) => {
          return (
            <CommentItem
              key={comment.commentId}
              comment={comment}
              deleteComment={deleteComment}
              user={user}
              fetchComments={fetchComments}
              handleLike={handleLike}
            />
          );
        })}
      </div>

      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          callback={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Comment;
