import { useState } from "react";
import styles from "./Continent.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components";
import { ContinentItems } from "./constants";

const Continent = () => {
    const [selectedContinents, setSelectedContinents] = useState([]);
    const navigate = useNavigate();

    const handleContinentClick = (continentName) => {
        setSelectedContinents((prevSelected) => {
            if (prevSelected.includes(continentName)) {
                return prevSelected.filter((name) => name !== continentName);
            } else {
                return [...prevSelected, continentName];
            }
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.title_box}>
                <p className={styles.title}>관심있는 여행지가 어디신가요?</p>
            </div>
            <div className={styles.continent_box}>
                {ContinentItems.map((item) => {
                    const isSelected = selectedContinents.includes(item.name);
                    return (
                        <div
                            key={item.name}
                            className={styles.continent}
                            onClick={() => handleContinentClick(item.name)}
                        >
                            <img 
                                src={item.imgSrc}
                                alt="continent"
                                className={`${styles.cont_img} ${isSelected ? styles.selected_img : ""}`}
                            />
                            {isSelected && <div className={styles.selected_text}>선택됨</div>}
                        </div>
                    );
                })}
            </div>
            <div className={styles.button_box}>
                <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate(PageEndPoints.DESTINATION)}
                >
                    다음
                </Button>
            </div>
        </div>
    );
};

export default Continent;
