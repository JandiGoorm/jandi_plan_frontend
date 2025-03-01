import { BaseLayout } from "@/layouts";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./BoardDetail.module.css";
import Comment from "./Comment";
import { APIEndPoints } from "@/constants";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Loading } from "@/components";
import { useAxios } from "@/hooks";
import { formatDistanceToNow } from "date-fns";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { buildPath } from "@/utils";
import { useAuth, useToast } from "@/contexts";

const BoardDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [likes, setLikes] = useState();
  const contentRef = useRef(null);
  const { loading, fetchData } = useAxios();
  const { user } = useAuth();


  const { createToast } = useToast();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: buildPath(APIEndPoints.BOARD_DETAIL, { id }),
    })
      .then((res) => {
        const items = res.data.items;
        let content;
        try {
          const parsed = JSON.parse(items.content);
          const converter = new QuillDeltaToHtmlConverter(parsed?.ops ?? "", {
            customTagAttributes: (op) => {
              if (op.insert?.type === "image" && op.attributes?.imageAlign) {
                if (op.attributes.imageAlign.align === "center") {
                  return {
                    style: `display: block; margin: 0 auto; width: ${
                      op.attributes.width || "auto"
                    };`,
                  };
                } else
                  return {
                    style: `float: ${op.attributes.imageAlign?.align}; width: ${
                      op.attributes.width || "auto"
                    };`,
                  };
              }
            },
          });
          content = converter.convert();
          // eslint-disable-next-line no-unused-vars
        } catch (err) {
          content = items.content;
        }

        setItem(() => {
          return {
            ...items,
            content,
          };
        });

        setLikes(items.likeCount);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [fetchData, id]);

  useEffect(() => {
    if (!contentRef.current) return;

    if (contentRef.current) {
      contentRef.current.querySelectorAll("pre").forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [item]);

  const handleLike = () =>{
    fetchData({
      method: "POST",
      url: buildPath(APIEndPoints.BOARD_LIKE, { id }),
    }).then(() => {
      setLikes(likes+1);
    }).catch((err) => {
      console.log(err);
      createToast({
        type: "error",
        text: err.data.message,
      });
    })
  }

  return (
    <BaseLayout>
      {loading ? (
        <Loading />
      ) : (
        item && (
          <div className={styles.container}>
            <p className={styles.title}>{item.title}</p>
            <div className={styles.header}>
              <div className={styles.user_info}>
                <img
                  src={item.user.profileImageUrl}
                  className={styles.user_img}
                />
                <p className={styles.user_name}>{item.user.userName}</p>
                <p className={styles.recommend}>조회수 654818</p>
                <p className={styles.recommend}>추천 {likes}</p>
              </div>
              <p className={styles.date}>
                {formatDistanceToNow(item.createdAt)}
              </p>
            </div>

            <div className={styles.divider} />

            <div
              dangerouslySetInnerHTML={{ __html: item.content }}
              className={`ql-editor ${styles.content}`}
              ref={contentRef}
            />

            <div className={styles.recommend_box}>
              <FaThumbsUp
                size={32}
                color={
                  item.isRecommended
                    ? "var(--color-amber-400)"
                    : "var( --color-gray-300)"
                }
                onClick={()=>{handleLike()}}
              />
              <p className={styles.recommend_count}>{likes}</p>
            </div>
            <div className={styles.divider} />

            {id && <Comment id={id} />}
          </div>
        )
      )}
    </BaseLayout>
  );
};

export default BoardDetail;
