import { useCallback, useEffect, useState } from "react";
import styles from "./Weather.module.css";
import { formatDate } from "date-fns";
import axios from "axios";

const Weather = ({ latitude, longitude }) => {
  const [fivedayForecast, setFivedayForecast] = useState([]);
  const [visibleForecast, setVisibleForecast] = useState(fivedayForecast);
  const key = import.meta.env.VITE_WEATHER_API_KEY;
  const baseUrl = `https://pro.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=kr`;

  const fetchWeather = useCallback(async () => {
    try {
      const { data } = await axios.get(baseUrl);

      const noonWeather = data.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .map((item) => ({
          date: formatDate(item.dt_txt.split(" ")[0], "MM. dd"),
          temp: item.main.temp.toFixed(1),
          iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
        }));

      setFivedayForecast(noonWeather);
    } catch (error) {
      console.log("Error: " + error);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 957) {
        setVisibleForecast(fivedayForecast.slice(0, 3));
      } else if (window.innerWidth <= 1058) {
        setVisibleForecast(fivedayForecast.slice(0, 4));
      } else {
        setVisibleForecast(fivedayForecast);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [fivedayForecast]);

  if (!visibleForecast || visibleForecast.length === 0)
    return <p>날씨 정보를 불러오는 중입니다...</p>;

  return (
    <div className={styles.container}>
      {visibleForecast.map((forecast, index) => (
        <div key={index} className={styles.forecast_card}>
          <p className={styles.forecast_text}>{forecast.date}</p>
          <img
            src={forecast.iconUrl}
            className={styles.forecast_img}
            alt="weather icon"
          />
          <p className={styles.forecast_text}>{forecast.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default Weather;
