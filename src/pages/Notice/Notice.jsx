import { BaseLayout } from "@/layouts";
import styles from "./Notice.module.css";
import NoticeItem from "./NoticeItem";
import { useEffect } from "react";
import { APIEndPoints } from "@/constants";
import { Loading } from "@/components";
import { useAxios } from "@/hooks";

const Notice = () => {
  const { loading, fetchData, response } = useAxios();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: APIEndPoints.NOTICEALL,
    });
  }, [fetchData]);

  if (loading) return <Loading />;
  return (
    <BaseLayout>
      <div className={styles.container}>
        <p className={styles.title}>공지사항</p>

        <div className={styles.content_container}>
          {response?.items.map((item) => {
            return <NoticeItem key={item.noticeId} item={item} />;
          })}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Notice;
