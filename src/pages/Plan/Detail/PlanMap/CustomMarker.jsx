import {
  AdvancedMarker,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const CustomMarker = ({
  schedule,
  selectedSchedule,
  onMarkerClick,
  ...props
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { place } = schedule;
  const isSelected = selectedSchedule?.itineraryId === schedule.itineraryId;

  return (
    <AdvancedMarker
      key={schedule.itineraryId}
      position={{
        lat: place.latitude,
        lng: place.longitude,
      }}
      ref={markerRef}
      onClick={() => {
        if (marker) {
          onMarkerClick(marker);
        }
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
