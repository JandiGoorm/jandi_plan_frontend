import {
  Button,
  ImageWithPlaceholder,
  Loading,
  Modal,
  ModalContent,
  ModalTrigger,
  ViewEditorContent,
} from "@/components";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios, useCommunity } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { useCallback, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BoardDetail.module.css";
import Comment from "./Comment";

import DeleteModal from "@/components/Modal/ModalContents/DeleteModal";
import { useAuth, useToast } from "@/contexts";
import { buildPath, formatISO, handleApiCall } from "@/utils";
import ReportModal from "./components/ReportModal";

const likeActionMap = {
  true: {
    method: "DELETE",
    successText: "좋아요를 취소했습니다.",
  },
  false: {
    method: "POST",
    successText: "좋아요를 눌렀습니다.",
  },
};

const BoardDetail = () => {
  const { id } = useParams();
  const { fetchData, response } = useAxios();
  const { fetchData: fetchLike } = useAxios();

  const { user } = useAuth();
  const { createToast } = useToast();
  const navigate = useNavigate();

  const { deleteCommunity } = useCommunity();

  const fetchDetail = useCallback(() => {
    fetchData({
      method: "GET",
      url: buildPath(APIEndPoints.BOARD_DETAIL, { id }),
    });
  }, [fetchData, id]);

  const handleClickLike = useCallback(
    (isLiked) => {
      const { method, successText } = likeActionMap[isLiked];

      handleApiCall(
        () =>
          fetchLike({
            method: method,
            url: buildPath(APIEndPoints.BOARD_LIKE, { id }),
          }),
        successText,
        null,
        createToast,
        null,
        (res) => createToast({ text: res.data.message, type: "error" })
      ).then(() => fetchDetail());
    },
    [createToast, fetchDetail, fetchLike, id]
  );

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  if (!response) {
    return <Loading />;
  }

  const item = response.items;

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.tags_container}>
          {item.hashtag.map((tag) => (
            <div className={styles.tag} key={tag}>
              {tag}
            </div>
          ))}
        </div>

        <p className={styles.title}>{item.title}</p>
        <div className={styles.header}>
          <div className={styles.user_info}>
            <div className={styles.user_img_box}>
              <ImageWithPlaceholder
                src={item.user.profileImageUrl}
                alt="user profile"
              />
            </div>

            <p className={styles.user_name}>{item.user.userName}</p>
            <p className={styles.recommend}>조회수 {item.viewCount}</p>
            <p className={styles.recommend}>추천 {item.likeCount}</p>
          </div>

          <div className={styles.header_right_box}>
            <p className={styles.date}>{formatISO(item.createdAt)}</p>
            {item.user.userId == user.userId ? (
              <div className={styles.flex_row}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    navigate(buildPath(PageEndPoints.BOARD_MODIFY, { id }))
                  }
                >
                  수정
                </Button>
                <Modal>
                  <ModalTrigger>
                    <Button variant="ghost" size="sm">
                      삭제
                    </Button>
                  </ModalTrigger>
                  <ModalContent>
                    <DeleteModal
                      callback={() =>
                        deleteCommunity(id).then(() =>
                          navigate(PageEndPoints.BOARD)
                        )
                      }
                    />
                  </ModalContent>
                </Modal>
              </div>
            ) : (
              <Modal>
                <ModalTrigger>
                  <div className={styles.dropdown_menu}>신고</div>
                </ModalTrigger>
                <ModalContent>
                  <ReportModal id={item.postId} getUrl={"boardReport"} />
                </ModalContent>
              </Modal>
            )}
          </div>
        </div>

        <div className={styles.divider} />

        <ViewEditorContent content={response?.items?.content} />

        <div className={styles.recommend_box}>
          <FaThumbsUp
            size={32}
            className={styles.thumbs}
            color={
              item.liked ? "var(--color-amber-400)" : "var( --color-gray-300)"
            }
            onClick={() => handleClickLike(item.liked)}
          />
          <p className={styles.recommend_count}>{item.likeCount}</p>
        </div>
        <div className={styles.divider} />

        {id && <Comment id={id} />}
      </div>
    </BaseLayout>
  );
};

export default BoardDetail;
