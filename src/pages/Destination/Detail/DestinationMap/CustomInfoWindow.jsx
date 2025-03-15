import { InfoWindow } from "@vis.gl/react-google-maps";
import styles from "./CustomInfoWindow.module.css";
import { LuDot } from "react-icons/lu";

const CustomInfoWindow = ({ selectedRestaurant, selectedMarker, onClose }) => {
  if (!selectedRestaurant || !selectedMarker) return null;

  const openTime = selectedRestaurant.openTimeJson.split(",");
  console.log(selectedRestaurant);
  return (
    <InfoWindow
      anchor={selectedMarker}
      pixelOffset={[0, -2]}
      onCloseClick={onClose}
      headerContent={
        <h1 className={styles.header}>{selectedRestaurant.name}</h1>
      }
    >
      <div className={styles.container}>
        <img
          src={selectedRestaurant.photoUrl}
          alt={selectedRestaurant.name}
          className={styles.image}
          onError={(e) => {
            e.target.src = "/none-image.png";
          }}
        />
        <p>{selectedRestaurant.address}</p>
        <div className={styles.open_time}>
          {openTime.map((time) => {
            return <p key={time}>{time}</p>;
          })}
        </div>

        <div className={styles.stats}>
          <p>리뷰 ({selectedRestaurant.ratingCount})</p>
          <LuDot />
          <p>평점 {selectedRestaurant.rating.toFixed(2)}</p>
        </div>
      </div>
    </InfoWindow>
  );
};

export default CustomInfoWindow;
