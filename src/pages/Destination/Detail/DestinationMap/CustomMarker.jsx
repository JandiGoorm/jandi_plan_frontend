import {
  AdvancedMarker,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const CustomMarker = ({
  restaurant,
  selectedRestaurant,
  onMarkerClick,
  ...props
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const isSelected = selectedRestaurant?.placeId === restaurant.placeId;

  return (
    <AdvancedMarker
      key={restaurant.placeId}
      position={{
        lat: restaurant.latitude,
        lng: restaurant.longitude,
      }}
      ref={markerRef}
      onClick={() => {
        if (marker) onMarkerClick(marker);
      }}
      {...props}
    >
      <Pin
        background={isSelected ? "var(--color-amber-200)" : null}
        borderColor={isSelected ? "var(--color-amber-400)" : null}
        glyphColor={isSelected ? "var(--color-amber-400)" : null}
      />
    </AdvancedMarker>
  );
};

export default CustomMarker;
