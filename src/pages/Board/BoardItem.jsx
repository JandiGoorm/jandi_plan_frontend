import { useNavigate } from "react-router-dom";
import styles from "./BoardItem.module.css";
import { PageEndPoints } from "@/constants";
import { buildPath } from "@/utils";
import { useCallback } from "react";
import { formatDate } from "date-fns";

const dummyItem = {
  commentCount: 0,
  createdAt: "2025-03-20T23:32:58.721771",
  likeCount: 0,
  postId: 1,
  title: "제목제목",
  content:
    "아라아르으라아ㅡㄹ아르이릐아르ㅏㅣ으리으리ㅏ으리으리ㅏㅡㅇ리ㅏㅡ이ㅏ르이ㅏ르아ㅣ르ㅏ이릐ㅏ으리ㅏ으라ㅣ으리ㅏ으리ㅏ으리ㅏ으리ㅏ으라ㅣ으리ㅏ으리으라ㅣ을ㅇ아라아르으라아ㅡㄹ아르이릐아르ㅏㅣ으리으리ㅏ으리으리ㅏㅡㅇ리ㅏㅡ이ㅏ르이ㅏ르아ㅣ르ㅏ이릐ㅏ으리ㅏ으라ㅣ으리ㅏ으리ㅏ으리ㅏ으리ㅏ으라ㅣ으리ㅏ으리으라ㅣ을ㅇ아라아르으라아ㅡㄹ아르이릐아르ㅏㅣ으리으리ㅏ으리으리ㅏㅡㅇ리ㅏㅡ이ㅏ르이ㅏ르아ㅣ르ㅏ이릐ㅏ으리ㅏ으라ㅣ으리ㅏ으리ㅏ으리ㅏ으리ㅏ으라ㅣ으리ㅏ으리으라ㅣ을ㅇ아라아르으라아ㅡㄹ아르이릐아르ㅏㅣ으리으리ㅏ으리으리ㅏㅡㅇ리ㅏㅡ이ㅏ르이ㅏ르아ㅣ르ㅏ이릐ㅏ으리ㅏ으라ㅣ으리ㅏ으리ㅏ으리ㅏ으리ㅏ으라ㅣ으리ㅏ으리으라ㅣ을ㅇ아라아르으라아ㅡㄹ아르이릐아르ㅏㅣ으리으리ㅏ으리으리ㅏㅡㅇ리ㅏㅡ이ㅏ르이ㅏ르아ㅣ르ㅏ이릐ㅏ으리ㅏ으라ㅣ으리ㅏ으리ㅏ으리ㅏ으리ㅏ으라ㅣ으리ㅏ으리으라ㅣ을ㅇ아라아르으라아ㅡㄹ아르이릐아르ㅏㅣ으리으리ㅏ으리으리ㅏㅡㅇ리ㅏㅡ이ㅏ르이ㅏ르아ㅣ르ㅏ이릐ㅏ으리ㅏ으라ㅣ으리ㅏ으리ㅏ으리ㅏ으리ㅏ으라ㅣ으리ㅏ으리으라ㅣ을ㅇ아라아르으라아ㅡㄹ아르이릐아르ㅏㅣ으리으리ㅏ으리으리ㅏㅡㅇ리ㅏㅡ이ㅏ르이ㅏ르아ㅣ르ㅏ이릐ㅏ으리ㅏ으라ㅣ으리ㅏ으리ㅏ으리ㅏ으리ㅏ으라ㅣ으리ㅏ으리으라ㅣ을ㅇ아라아르으라아ㅡㄹ아르이릐아르ㅏㅣ으리으리ㅏ으리으리ㅏㅡㅇ리ㅏㅡ이ㅏ르이ㅏ르아ㅣ르ㅏ이릐ㅏ으리ㅏ으라ㅣ으리ㅏ으리ㅏ으리ㅏ으리ㅏ으라ㅣ으리ㅏ으리으라ㅣ을ㅇ",
  tags: ["하이", "동행", "등등"],
  thumbnail: "/fukuoka.jpg",
  user: {
    email: "weg1248@naver.com",
    firstName: "정희",
    lastName: "한",
    profileImageUrl:
      "https://storage.googleapis.com/plan-storage/c8f6f6c6-efa4-448c-ad3d-7a7ebdfab927_34533234.png",
    userId: 40,
    userName: "정희",
  },
  viewCount: 20,
};

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
      <div className={styles.tags_container}>
        {item.hashtag.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.header_container}>
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

        <div className={styles.header_status}>
          <p>조회수 {item.viewCount}</p>&middot;
          <p>댓글 {item.commentCount}</p>&middot;
          <p>좋아요 {item.likeCount}</p>
        </div>
      </div>

      <div className={styles.content_container}>
        <p className={styles.content_text}>{item.preview}</p>

        {item.thumbnail && (
          <img
            src={item.thumbnail}
            alt="thumbnail"
            className={styles.thumbnail}
          />
        )}
      </div>
    </li>
  );
};

export default BoardItem;
