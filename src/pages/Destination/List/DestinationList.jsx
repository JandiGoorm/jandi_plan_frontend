import styles from "./DestinationList.module.css";
import { useState, useEffect, useCallback } from "react";
import { BaseLayout } from "@/layouts";
import { Button, CityCard, Loading } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils";
import { PageEndPoints } from "@/constants";

const DestinationList = () => {
  const {
    fetchData: getContinent,
    response: continents,
    loading: continentsLoading,
  } = useAxios();
  const {
    fetchData: getCountry,
    response: countries,
    loading: countriesLoading,
  } = useAxios();
  const {
    fetchData: getDestination,
    response: destinations,
    loading: destinationsLoading,
  } = useAxios();

  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const navigate = useNavigate();

  const handleCityCardClick = useCallback(
    (id) => {
      const url = buildPath(PageEndPoints.DESTINATION_DETAIL, {
        id,
      });

      navigate(url);
    },
    [navigate]
  );

  useEffect(() => {
    getContinent({
      method: "GET",
      url: APIEndPoints.CONTINENT,
      params: { filter: "" },
    });
  }, [getContinent]);

  useEffect(() => {
    if (!selectedContinent) return;

    getCountry({
      method: "GET",
      url: APIEndPoints.COUNTRY,
      params: {
        category: "CONTINENT",
        filter: selectedContinent,
      },
    }).then(() => {
      setSelectedCountry("");
    });
  }, [getCountry, selectedContinent]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCountry) {
      params.append("category", "COUNTRY");
      params.append("filter", selectedCountry);
    } else if (selectedContinent && !selectedCountry) {
      params.append("category", "CONTINENT");
      params.append("filter", selectedContinent);
    } else if (!selectedContinent && !selectedCountry) {
      params.append("filter", "");
      params.append("category", "ALL");
    }

    getDestination({
      method: "GET",
      url: APIEndPoints.DESTINATION,
      params,
    });
  }, [getDestination, selectedContinent, selectedCountry]);

  const isLoading =
    continentsLoading || countriesLoading || destinationsLoading;

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.title_box}>
          <p className={styles.title}>어디로 놀러가고 싶으신가요?</p>
        </div>

        <div className={styles.category_container}>
          <div className={styles.category_continet}>
            {continents?.map((continent) => (
              <Button
                key={`continent_${continent.continentId}`}
                onClick={() => setSelectedContinent(continent.name)}
                variant={
                  selectedContinent === continent.name ? "solid" : "ghost"
                }
              >
                {continent.name}
              </Button>
            ))}
          </div>

          <div className={styles.category_country}>
            {countries?.map((country) => (
              <Button
                key={`country_${country.countryId}`}
                onClick={() => setSelectedCountry(country.name)}
                variant={selectedCountry === country.name ? "solid" : "ghost"}
              >
                {country.name}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <Loading
            isSection
            style={{
              flex: 1,
              minHeight: "30rem",
            }}
          />
        ) : (
          <div className={styles.plan_container}>
            {destinations?.map((item) => (
              <div
                key={item.cityId}
                onClick={() => handleCityCardClick(item.name)}
              >
                <CityCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default DestinationList;
