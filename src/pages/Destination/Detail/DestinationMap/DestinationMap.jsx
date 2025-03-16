import { Map, AdvancedMarkerAnchorPoint } from "@vis.gl/react-google-maps";
import { APIProvider } from "@vis.gl/react-google-maps";
import styles from "./DestinationMap.module.css";
import { useCallback, useState } from "react";
import CustomMarker from "./CustomMarker";
import CustomInfoWindow from "./CustomInfoWindow";

const DestinationMap = ({ latitude, longitude, restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const position = { lat: latitude, lng: longitude };

  const onMouseEnter = useCallback((id) => {
    setHoverId(id);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHoverId(null);
  }, []);

  const closeInfoWindow = useCallback(() => {
    setSelectedRestaurant(null);
    setSelectedMarker(null);
  }, []);

  const onMarkerClick = useCallback(
    (restaurant, marker) => {
      if (selectedRestaurant?.placeId === restaurant.placeId) {
        closeInfoWindow();
        return;
      }

      if (
        selectedMarker !== marker ||
        selectedRestaurant?.placeId !== restaurant.placeId
      ) {
        setSelectedRestaurant(restaurant);
        setSelectedMarker(marker);
      }

      setSelectedRestaurant(restaurant);
    },
    [closeInfoWindow, selectedMarker, selectedRestaurant?.placeId]
  );

  return (
    <div className={styles.container}>
      <p className={styles.title}>위치를 확인하세요</p>
      <div className={styles.map_container}>
        <APIProvider apiKey={API_KEY}>
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={position}
            defaultZoom={12}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId="fine_place"
          >
            {restaurants &&
              restaurants.map((restaurant) => {
                return (
                  <CustomMarker
                    key={restaurant.placeId}
                    restaurant={restaurant}
                    selectedRestaurant={selectedRestaurant}
                    onMarkerClick={(marker) =>
                      onMarkerClick(restaurant, marker)
                    }
                    onMouseEnter={() => onMouseEnter(restaurant.placeId)}
                    onMouseLeave={onMouseLeave}
                    style={{
                      transform: `scale(${
                        [hoverId, selectedRestaurant?.placeId].includes(
                          restaurant.placeId
                        )
                          ? 1.3
                          : 1
                      })`,
                      transformOrigin:
                        AdvancedMarkerAnchorPoint["BOTTOM"].join(" "),
                    }}
                  />
                );
              })}
          </Map>
          {selectedRestaurant && selectedMarker && (
            <CustomInfoWindow
              key={selectedRestaurant.placeId}
              selectedRestaurant={selectedRestaurant}
              selectedMarker={selectedMarker}
              onClose={closeInfoWindow}
            />
          )}
        </APIProvider>
      </div>
    </div>
  );
};

export default DestinationMap;
