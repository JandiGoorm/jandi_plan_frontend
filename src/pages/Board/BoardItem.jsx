import { useNavigate } from "react-router-dom";
import styles from "./BoardItem.module.css";
import { PageEndPoints } from "@/constants";
import { buildPath } from "@/utils";
import { useCallback } from "react";
import { formatDate } from "date-fns";

const BoardItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    const path = buildPath(PageEndPoints.BOARD_DETAIL, {
      id: item.postId,
    });
    navigate(path);
  }, [item.postId, navigate]);

  return (
    <li key={item.postId} className={styles.container} onClick={handleClick}>
      <div className={styles.left_container}>
        {item.hashtag.length > 0 && (
          <div className={styles.tags_container}>
            {item.hashtag.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.header_info}>
          <img
            className={styles.user_image}
            src={item.user.profileImageUrl}
            alt="user_image"
          />

          <div className={styles.header_info_text}>
            <p className={styles.header_title}>{item.title}</p>
            <div className={styles.header_sub}>
              <p>{item.user.userName}</p>
              <p className={styles.created_at}>
                {formatDate(item.createdAt, "yyyy년 MM월 dd일 작성")}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.content_container}>
          <p className={styles.content_text}>{item.preview}</p>
        </div>

        <div className={styles.header_status}>
          <p>조회수 {item.viewCount}</p>&middot;
          <p>댓글 {item.commentCount}</p>&middot;
          <p>좋아요 {item.likeCount}</p>
        </div>
      </div>

      {item.thumbnail && (
        <img
          src={item.thumbnail}
          alt="thumbnail"
          className={styles.thumbnail}
        />
      )}
    </li>
  );
};

export default BoardItem;
