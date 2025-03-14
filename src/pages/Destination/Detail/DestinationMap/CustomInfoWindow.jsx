import { InfoWindow } from "@vis.gl/react-google-maps";
import styles from "./CustomInfoWindow.module.css";

const CustomInfoWindow = ({ selectedRestaurant, selectedMarker, onClose }) => {
  if (!selectedRestaurant || !selectedMarker) return null;

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
        <p>{selectedRestaurant.rating}</p>
        <p>{selectedRestaurant.address}</p>
      </div>
    </InfoWindow>
  );
};

export default CustomInfoWindow;
