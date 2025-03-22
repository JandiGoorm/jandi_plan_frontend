import { useAxios } from "@/hooks";
import styles from "./Destination.module.css";
import { useCallback, useEffect, useState } from "react";
import { APIEndPoints } from "@/constants";
import AllCities from "./AllCities";
import PreferenceCities from "./PreferenceCities";
import { AnimatePresence, motion } from "framer-motion";

const Destination = ({ setSelectedCity }) => {
  const [cityHash, setCityHash] = useState(null);
  const [isViewAllCities, setIsViewAllCities] = useState(false);

  const { fetchData: getCities, loading: citiesLoading } = useAxios();
  const {
    fetchData: getPreferenceCities,
    response: preferenceCities,
    loading: preferenceLoading,
  } = useAxios();

  const handleChangeView = useCallback(() => {
    setIsViewAllCities((prev) => !prev);
  }, []);

  useEffect(() => {
    getPreferenceCities({
      url: APIEndPoints.PREFER_DEST,
      method: "GET",
    });
  }, [getPreferenceCities]);

  useEffect(() => {
    getCities({
      url: APIEndPoints.DESTINATION,
      method: "GET",
      params: {
        category: "ALL",
      },
    }).then((res) => {
      const { data } = res;
      const newCityHash = {};
      const idHash = new Set();

      data.forEach((item) => {
        const {
          country: { continent },
        } = item;
        const continentName = continent.name;
        const countryName = item.country.name;

        if (idHash.has(item.cityId)) {
          return;
        }

        if (!newCityHash[continentName]) {
          newCityHash[continentName] = {};
        }

        if (!newCityHash[continentName][countryName]) {
          newCityHash[continentName][countryName] = [];
        }

        newCityHash[continentName][countryName].push(item);
        idHash.add(item.cityId);
      });

      setCityHash(newCityHash);
    });
  }, [getCities]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>여행지 선택하기</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={isViewAllCities}
          initial={{ opacity: 0, x: isViewAllCities ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isViewAllCities ? 50 : -50 }}
          transition={{ duration: 0.5 }}
        >
          {isViewAllCities ? (
            <AllCities
              allCities={cityHash}
              setSelectedCity={setSelectedCity}
              loading={citiesLoading}
              handleChangeView={handleChangeView}
            />
          ) : (
            <PreferenceCities
              preferenceCities={preferenceCities}
              loading={preferenceLoading}
              setSelectedCity={setSelectedCity}
              handleChangeView={handleChangeView}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Destination;
