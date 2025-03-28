import { Button, ImageWithPlaceholder, Loading } from "@/components";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Continent.module.css";

const Continent = () => {
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [continents, setContinents] = useState([]);

  const navigate = useNavigate();
  const { createToast } = useToast();
  const { loading, fetchData } = useAxios();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: APIEndPoints.CONTINENT,
      params: { filter: "" },
    }).then((res) => {
      setContinents(res.data);
    });
  }, [fetchData]);

  const handleContinentClick = (continentName) => {
    setSelectedContinents((prevSelected) => {
      if (prevSelected.includes(continentName)) {
        return prevSelected.filter((name) => name !== continentName);
      } else {
        return [...prevSelected, continentName];
      }
    });
  };

  const handleNextClick = () => {
    selectedContinents.length === 0
      ? createToast({ type: "error", text: "관심있는 대륙을 선택해 주세요." })
      : navigate(PageEndPoints.PREF_DEST, {
          state: { selectedContinents },
        });
  };

  if (loading) return <Loading />;
  return (
    <div className={styles.container}>
      <p className={styles.title}>관심있는 여행지가 어디신가요?</p>

      <div className={styles.continent_box}>
        {continents.map((item) => {
          const isSelected = selectedContinents.includes(item.name);
          return (
            <div
              key={item.name}
              className={styles.continent}
              onClick={() => handleContinentClick(item.name)}
            >
              <ImageWithPlaceholder
                src={item.imageUrl}
                alt="continent"
                className={`${styles.cont_img} ${
                  isSelected ? styles.selected_img : ""
                }`}
                placeholderClassName={styles.cont_img_placeholder}
              />

              {isSelected ? <FaCheck className={styles.check_box} /> : null}
              {isSelected ? (
                <div className={styles.selected_text}>{item.name}</div>
              ) : (
                <div className={styles.hover_text}>{item.name}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.button_box}>
        <Button size="lg" variant="outline" onClick={() => handleNextClick()}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default Continent;
