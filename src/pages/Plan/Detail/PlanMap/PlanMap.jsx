import {
  AdvancedMarkerAnchorPoint,
  Map,
  useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePlanDetail } from "../PlanDetailContext";
import CustomMarker from "./CustomMarker";
import styles from "./PlanMap.module.css";
import Polyline from "./PolyLine";
import CustomInfoWindow from "./CustomInfoWindow";

const PlanMap = () => {
  const [hoverId, setHoverId] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { itineraries, focusDay, flattendItinerary, tripDetail } =
    usePlanDetail();

  const onMouseEnter = useCallback((id) => {
    setHoverId(id);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHoverId(null);
  }, []);

  const closeInfoWindow = useCallback(() => {
    setSelectedSchedule(null);
    setSelectedMarker(null);
  }, []);

  const onMarkerClick = useCallback(
    (schedule, marker) => {
      if (schedule.itineraryId === selectedSchedule?.itineraryId) {
        closeInfoWindow();
        return;
      }

      if (
        selectedMarker !== marker ||
        selectedSchedule?.itineraryId !== schedule.itineraryId
      ) {
        setSelectedSchedule(schedule);
        setSelectedMarker(marker);
      }
    },
    [closeInfoWindow, selectedMarker, selectedSchedule?.itineraryId]
  );

  const map = useMap("main-map");

  const focusSchedule = flattendItinerary.find((v) => v.date === focusDay);

  const defaultPosition = useMemo(() => {
    return {
      lat: tripDetail?.latitude,
      lng: tripDetail?.longitude,
    };
  }, [tripDetail?.latitude, tripDetail?.longitude]);

  const renderSchedule = useMemo(() => {
    if (!focusDay) return itineraries ?? [];
    const find = flattendItinerary.find((v) => v.date === focusDay);

    return find.data ?? [];
  }, [flattendItinerary, focusDay, itineraries]);

  const flightPlanCoordinates = renderSchedule.map((v) => {
    const { place } = v;
    return { lat: place.latitude, lng: place.longitude };
  });

  useEffect(() => {
    if (!map || !tripDetail) return;

    if (focusSchedule?.data?.length > 0) {
      const firstContent = focusSchedule.data[0];

      map.panTo({
        lat: firstContent.place.latitude,
        lng: firstContent.place.longitude,
      });
    } else {
      map.panTo(defaultPosition);
    }
  }, [defaultPosition, focusSchedule, map, tripDetail]);

  return (
    <div className={styles.map_container}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={defaultPosition}
        defaultZoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        id="main-map"
        mapId="main-map"
        onClick={closeInfoWindow}
      >
        {renderSchedule.map((schedule) => {
          return (
            <CustomMarker
              key={schedule.itineraryId}
              schedule={schedule}
              selectedSchedule={selectedSchedule}
              onMarkerClick={(marker) => onMarkerClick(schedule, marker)}
              onMouseEnter={() => onMouseEnter(schedule.itineraryId)}
              onMouseLeave={onMouseLeave}
              style={{
                transform: `scale(${
                  [hoverId, selectedSchedule?.itineraryId].includes(
                    schedule.itineraryId
                  )
                    ? 1.3
                    : 1
                })`,
                transformOrigin: AdvancedMarkerAnchorPoint["BOTTOM"].join(" "),
              }}
            />
          );
        })}

        {focusDay && <Polyline path={flightPlanCoordinates} />}

        {selectedMarker && selectedSchedule && (
          <CustomInfoWindow
            key={selectedSchedule?.itineraryId}
            selectedSchedule={selectedSchedule}
            selectedMarker={selectedMarker}
            onClose={closeInfoWindow}
          />
        )}
      </Map>
    </div>
  );
};

export default PlanMap;
