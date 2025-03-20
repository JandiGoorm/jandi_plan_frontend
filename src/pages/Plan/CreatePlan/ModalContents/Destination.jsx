import { useAxios } from "@/hooks";
import styles from "./Destination.module.css";
import { useEffect, useMemo, useState } from "react";
import { APIEndPoints } from "@/constants";
import { Button, CityCard } from "@/components";
import { useModal } from "@/components/Modal/ModalContext";

const Destination = ({ setSelectedCity }) => {
  const [selectedContinent, setSelectedContinent] = useState("");

  const { closeModal } = useModal();

  const cityHash = useMemo(() => {
    return {};
  }, []);
  const idHash = useMemo(() => new Set(), []);

  const { fetchData } = useAxios();

  const renderItem = useMemo(() => {
    return cityHash[selectedContinent];
  }, [cityHash, selectedContinent]);

  useEffect(() => {
    fetchData({
      url: APIEndPoints.DESTINATION,
      method: "GET",
      params: {
        category: "ALL",
      },
    }).then((res) => {
      const { data } = res;
      data.forEach((item) => {
        const {
          country: { continent },
        } = item;
        const continentName = continent.name;
        const countryName = item.country.name;

        if (idHash.has(item.cityId)) {
          return;
        }

        if (!cityHash[continentName]) {
          cityHash[continentName] = {};
        }

        if (!cityHash[continentName][countryName]) {
          cityHash[continentName][countryName] = [];
        }

        cityHash[continentName][countryName].push(item);
        idHash.add(item.cityId);
      });

      setSelectedContinent(Object.keys(cityHash)[0]);
    });
  }, [fetchData, cityHash, idHash]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>여행지 선택하기</p>

      <div className={styles.flex_column}>
        <p className={styles.sub_title}>선호 여행지</p>
      </div>

      <div className={styles.flex_column}>
        <p className={styles.sub_title}>전체 여행지</p>
        <div className={styles.filter_btns}>
          {Object.keys(cityHash).map((continent) => {
            return (
              <Button
                key={continent}
                variant={selectedContinent === continent ? "solid" : "ghost"}
                onClick={() => setSelectedContinent(continent)}
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {continent}
              </Button>
            );
          })}
        </div>

        <div className={styles.country_container}>
          {renderItem &&
            Object.keys(renderItem).map((country) => {
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
            })}
        </div>
      </div>
    </div>
  );
};

export default Destination;
