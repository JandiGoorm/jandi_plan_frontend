import { BaseLayout } from "@/layouts";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./BoardDetail.module.css";
import Comment from "./Comment";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Loading,
  Modal,
  ModalContent,
  ModalTrigger,
  ViewEditorContent,
} from "@/components";
import { useAxios, useCommunity } from "@/hooks";
import { formatDistanceToNow } from "date-fns";

import { buildPath } from "@/utils";
import { useAuth, useToast } from "@/contexts";
import ReportModal from "./components/ReportModal";
import DeleteModal from "@/components/Modal/ModalContents/DeleteModal";

const BoardDetail = () => {
  const [likes, setLikes] = useState();

  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);

  const { loading, fetchData, response } = useAxios();
  const { fetchData: fetchLike } = useAxios();

  const { user } = useAuth();
  const { createToast } = useToast();
  const navigate = useNavigate();

  const { deleteCommunity } = useCommunity();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: buildPath(APIEndPoints.BOARD_DETAIL, { id }),
    })
      .then((res) => {
        const items = res.data.items;

        setLikes(items.likeCount);
        setIsLiked(items.liked);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [fetchData, id]);

  const handleLike = () => {
    let method = "";
    if (isLiked) {
      method = "DELETE";
    } else {
      method = "POST";
    }
    fetchLike({
      method: method,
      url: buildPath(APIEndPoints.BOARD_LIKE, { id }),
    })
      .then(() => {
        if (isLiked) {
          setLikes(likes - 1);
          setIsLiked((prev) => !prev);
        } else {
          setLikes(likes + 1);
          setIsLiked((prev) => !prev);
        }
      })
      .catch((err) => {
        console.log(err);
        createToast({
          type: "error",
          text: err.data.message,
        });
      });
  };

  if (loading || !response) {
    return <Loading />;
  }

  const item = response.items;

  return (
    <BaseLayout>
      <div className={styles.container}>
        <p className={styles.title}>{item.title}</p>
        <div className={styles.header}>
          <div className={styles.user_info}>
            <img src={item.user.profileImageUrl} className={styles.user_img} />
            <p className={styles.user_name}>{item.user.userName}</p>
            <p className={styles.recommend}>조회수 654818</p>
            <p className={styles.recommend}>추천 {likes}</p>
          </div>
          <div className={styles.header_right_box}>
            <p className={styles.date}>{formatDistanceToNow(item.createdAt)}</p>
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
              isLiked ? "var(--color-amber-400)" : "var( --color-gray-300)"
            }
            onClick={() => handleLike()}
          />
          <p className={styles.recommend_count}>{likes}</p>
        </div>
        <div className={styles.divider} />

        {id && <Comment id={id} />}
      </div>
    </BaseLayout>
  );
};

export default BoardDetail;
