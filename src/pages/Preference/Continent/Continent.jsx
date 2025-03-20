import styles from "./Continent.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Loading } from "@/components";
import { PageEndPoints, APIEndPoints } from "@/constants";
import { FaCheck } from "react-icons/fa";
import { useAxios } from "@/hooks";
import { useToast } from "@/contexts";

const Continent = () => {
  const [selectedContinents, setSelectedContinents] = useState([]);

  const navigate = useNavigate();
  const { createToast } = useToast();
  const { loading, fetchData, response } = useAxios();
  const location = useLocation();
  const mode = location.state?.mode;

  useEffect(() => {
    fetchData({
      method: "GET",
      url: APIEndPoints.CONTINENT,
      params: { filter: "" },
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
    {
      selectedContinents.length === 0
        ? createToast({ type: "error", text: "관심있는 대륙을 선택해 주세요." })
        : navigate(PageEndPoints.PREF_DEST, {
            state: { selectedContinents, mode },
          });
    }
  };

  if (loading) return <Loading />;
  return (
    <div className={styles.container}>
      <p className={styles.title}>관심있는 여행지가 어디신가요?</p>

      <div className={styles.continent_box}>
        {response?.map((item) => {
          const isSelected = selectedContinents.includes(item.name);
          return (
            <div
              key={item.name}
              className={styles.continent}
              onClick={() => handleContinentClick(item.name)}
            >
              <img
                src={item.imageUrl}
                alt="continent"
                className={`${styles.cont_img} ${
                  isSelected ? styles.selected_img : ""
                }`}
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
