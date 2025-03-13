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
  const { loading, fetchData, response } = useAxios();
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.CONTINENT}`,
      params: { filter: "" },
    }).then((res) => {
      console.log(res.data);
      setContinents(res.data || []);
    });
  }, []);

  useEffect(() => {
    console.log(selectedContinent);
    if (!selectedContinent) return;

    fetchData({
      method: "GET",
      url: `${APIEndPoints.COUNTRY}`,
      params: {
        category: "CONTINENT",
        filter: selectedContinent,
      },
    }).then((res) => {
      setCountries(res.data || []);
      setSelectedCountry("");
    });
  }, [selectedContinent]);

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

    fetchData({
      method: "GET",
      url: `${APIEndPoints.DESTINATION}`,
      params, ///여기에 들어가는거 수정 그냥 params만 들어가면 될듯듯
    }).then((res) => {
      console.log(res.data);
      setDestinations(res.data);
    });
  }, [selectedContinent, selectedCountry]);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.title_box}>
          <p className={styles.title}>어디로 놀러가고 싶으신가요?</p>
        </div>
        <div className={styles.category_container}>
          <div className={styles.category_continet}>
            {continents.map((continent) => (
              <Button
                key={continent.id}
                onClick={() => setSelectedContinent(continent.name)}
                variant={
                  selectedContinent === continent.name ? "solid" : "ghost"
                }
              >
                {continent.name}
              </Button>
            ))}
          </div>
          {countries.length > 0 && (
            <div className={styles.category_country}>
              {countries.map((country) => (
                <Button
                  key={country.id}
                  onClick={() => setSelectedCountry(country.name)}
                  variant={selectedCountry === country.name ? "solid" : "ghost"}
                >
                  {country.name}
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className={styles.plan_container}>
          {destinations.map((item) => (
            <div key={item.cityId} onClick={() => navigate(buildPath(PageEndPoints.DESTINATION_DETAIL, { id: item.cityId }), { state: { cityName: item.name } })}>
              <CityCard  item={item} />
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default DestinationList;
