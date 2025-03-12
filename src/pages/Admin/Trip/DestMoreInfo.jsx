import styles from "./DestMoreInfo.module.css";
import FormCity from "./City/FormCity";
import FormCountry from "./Country/FormCountry";

const DestMoreInfo = ({ content, data, onSuccess }) => {
  const isCountry = content === "나라";

  return (
    <div className={styles.container}>
      <p className={styles.title}>{content} 수정하기</p>
      <div className={styles.content_container}>
        {isCountry ? (
          <FormCountry forUse="PATCH" data={data} onSuccess={onSuccess} />
        ) : (
          <FormCity forUse="PATCH" data={data} onSuccess={onSuccess} />
        )}
      </div>
    </div>
  );
};

export default DestMoreInfo;
