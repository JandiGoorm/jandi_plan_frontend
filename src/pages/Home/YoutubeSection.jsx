import { useCallback, useEffect, useState } from "react";
import { youtubeContents } from "./constants";
import styles from "./YoutubeSection.module.css";
import { FaYoutube } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "@/constants";

const YoutubeSection = () => {
  const [renderItem, setRenderItem] = useState([]);

  const navigate = useNavigate();

  const handleOpenYouTubeClick = useCallback((url) => {
    window.open(url, "_blank");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setRenderItem(youtubeContents.slice(0, 1));
      } else if (window.innerWidth <= 900) {
        setRenderItem(youtubeContents.slice(0, 2));
      } else {
        setRenderItem(youtubeContents);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.centered}>
          <div className={styles.title_container}>
            <p className={styles.title}>영상으로 프리뷰</p>

            <div className={styles.subtitle}>
              <FaYoutube className={styles.icon} size={24} />
              <p>유튜브로 미리보는 여행지</p>
            </div>
          </div>

          <div className={styles.youtube_container}>
            {renderItem.map((content) => {
              return (
                <div
                  key={content.city}
                  className={styles.youtube_item_container}
                >
                  <iframe
                    className={styles.youtube_item}
                    src={content.src}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  <div className={styles.info_wrapper}>
                    <div className={styles.youtube_info}>
                      <div className={styles.youtube_info_text}>
                        <p>{content.owner}의</p>
                        <p>{content.city}여행</p>
                      </div>
                      <p className={styles.youtube_title}>{content.title}</p>
                    </div>

                    <button
                      className={styles.youtube_link_btn}
                      onClick={() => handleOpenYouTubeClick(content.linkUrl)}
                    >
                      <FaArrowRight size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.youtube_footer}>
        <div className={styles.centered}>
          <div className={styles.youtube_footer_text}>
            <p>JUST PLAN IT 에서 즐거운 여행계획을 만들어보세요</p>
            <button
              className={styles.plan_nav_btn}
              onClick={() => navigate(PageEndPoints.PLAN_LIST)}
            >
              바로가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeSection;
