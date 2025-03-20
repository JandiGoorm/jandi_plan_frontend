import { useCallback } from "react";
import styles from "./MapSide.module.css";
import { FaStar } from "react-icons/fa";
import { Loading } from "@/components";

const MapSide = ({ restaurants, restaurantsLoading }) => {
  const handleClick = useCallback((restaurant) => {
    window.open(restaurant.url, "_blank");
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.title}>주변 맛집</p>

      {restaurantsLoading ? (
        <Loading
          isSection={true}
          style={{
            width: "100%",
            flex: 1,
          }}
        />
      ) : (
        <div className={styles.restaurant_container}>
          {restaurants?.map((restaurant) => (
            <div
              key={restaurant.placeId}
              className={styles.restaurant}
              onClick={() => handleClick(restaurant)}
            >
              <img
                src={restaurant.photoUrl}
                alt={restaurant.name}
                className={styles.image}
                onError={(e) => {
                  e.target.src = "/none-image.png";
                }}
              />
              <div className={styles.text}>
                <div className={styles.flex_row}>
                  <p className={styles.name}>{restaurant.name}</p>

                  <div className={styles.stats}>
                    <FaStar className={styles.star_icon} />
                    <p className={styles.rating}>
                      {restaurant.rating.toFixed(2)} 점
                    </p>
                  </div>
                </div>
                <p>{restaurant.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapSide;
