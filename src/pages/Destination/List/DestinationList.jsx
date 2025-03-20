import styles from "./DestinationList.module.css";
import { useState, useEffect } from "react";
import { BaseLayout } from "@/layouts";
import { Button, CityCard } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils";
import { PageEndPoints } from "@/constants";

const DestinationList = () => {
  const { fetchData: getContinent, response: continents } = useAxios();
  const { fetchData: getCountry, response: countries } = useAxios();
  const { fetchData: getDestination, response: destinations } = useAxios();

  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const navigate = useNavigate();

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

        <div className={styles.plan_container}>
          {destinations?.map((item) => (
            <div
              key={item.cityId}
              onClick={() =>
                navigate(
                  buildPath(PageEndPoints.DESTINATION_DETAIL, {
                    id: item.name,
                  }),
                  { state: { cityName: item.name, cityId: item.cityId } }
                )
              }
            >
              <CityCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default DestinationList;
