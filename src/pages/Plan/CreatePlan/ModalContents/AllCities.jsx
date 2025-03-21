import { useEffect, useMemo, useState } from "react";
import styles from "./AllCities.module.css";
import { Button, CityCard, Loading } from "@/components";
import { useModal } from "@/components/Modal/ModalContext";

const AllCities = ({
  allCities,
  setSelectedCity,
  loading,
  handleChangeView,
}) => {
  const [selectedContinent, setSelectedContinent] = useState(null);

  const { closeModal } = useModal();

  const renderItem = useMemo(() => {
    if (loading || !allCities) return null;
    return allCities[selectedContinent];
  }, [allCities, loading, selectedContinent]);

  useEffect(() => {
    if (!allCities) return;

    setSelectedContinent(Object.keys(allCities)[0]);
  }, [allCities]);

  return (
    <div className={styles.flex_column}>
      <div className={styles.sub_title}>
        <p>전체 여행지</p>
        <Button variant="ghost" isInModal onClick={handleChangeView}>
          선호 여행지
        </Button>
      </div>

      <div className={styles.filter_btns}>
        {Object.keys(allCities ?? {})?.map((continent) => {
          return (
            <Button
              key={continent}
              variant={selectedContinent === continent ? "solid" : "ghost"}
              onClick={() => setSelectedContinent(continent)}
              style={{
                whiteSpace: "nowrap",
              }}
              isInModal
            >
              {continent}
            </Button>
          );
        })}
      </div>

      <div className={styles.country_container}>
        {loading ? (
          <Loading
            isSection
            style={{
              width: "100%",
              height: "30rem",
            }}
          />
        ) : (
          Object.keys(renderItem ?? {})?.map((country) => {
            return (
              <div key={country} className={styles.flex_column}>
                <p className={styles.country_title}>{country}</p>

                <div className={styles.grid_container}>
                  {renderItem[country].map((city) => {
                    return (
                      <div
                        key={city.cityId}
                        onClick={() => {
                          setSelectedCity(city);
                          closeModal();
                        }}
                        className={styles.wrapper_city_card}
                      >
                        <CityCard item={city} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllCities;
