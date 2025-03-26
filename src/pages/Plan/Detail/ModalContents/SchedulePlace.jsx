import { useEffect, useRef, useState } from "react";
import styles from "./SchedulePlace.module.css";
import {
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { Button, Input } from "@/components";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";

const MapHandler = ({ place, marker }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }

    marker.position = place.geometry?.location;
  }, [map, place, marker]);
  return null;
};

const PlaceAutocomplete = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete || !inputRef.current) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <Input
      ref={inputRef}
      style={{
        width: "30rem",
        marginTop: "0.5rem",
      }}
      placeholder="주소 또는 장소명을 입력하세요."
    />
  );
};

const SchedulePlace = ({ handleScheduleStep, formController }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { setValue } = formController;

  const { fetchData } = useAxios();

  useEffect(() => {
    if (!selectedPlace) return;

    if (!selectedPlace.formatted_address || !selectedPlace.geometry) {
      console.error("no longer valid placeID", selectedPlace);
      return;
    }

    const {
      name,
      formatted_address,
      geometry: { location },
    } = selectedPlace;

    const flattenPlace = {
      name,
      address: formatted_address,
      latitude: location.lat(),
      longitude: location.lng(),
    };

    fetchData({
      url: APIEndPoints.PLACE,
      method: "POST",
      data: flattenPlace,
    }).then((res) => {
      setValue("placeId", res.data.placeId);
      setValue("placeName", res.data.name);
    });
  }, [fetchData, selectedPlace, setValue]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>장소 찾기</p>
      <div className={styles.map_container}>
        <Map
          style={{ width: "100%", height: "100%" }}
          mapId={"find_schedule_place"}
          defaultZoom={3}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <AdvancedMarker ref={markerRef} position={null} />
        </Map>
        <MapControl position={ControlPosition.TOP_CENTER}>
          <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
        </MapControl>
        <MapHandler place={selectedPlace} marker={marker} />
      </div>

      <Button
        onClick={handleScheduleStep}
        style={{
          alignSelf: "end",
        }}
        isInModal
      >
        등록
      </Button>
    </div>
  );
};

export default SchedulePlace;
