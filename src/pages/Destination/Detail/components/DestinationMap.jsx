import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { APIProvider } from "@vis.gl/react-google-maps";
import styles from "./DestinationMap.module.css";

const DestinationMap = ({latitude, longitude}) => {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const position = { lat: latitude, lng: longitude};

    return (
    <div className={styles.map_container}>
        <APIProvider apiKey={API_KEY}>
            <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={position}
            defaultZoom={11}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId="fine_place"
            >
            <AdvancedMarker position={position} />
            </Map>
        </APIProvider>
    </div>
    );
};

export default DestinationMap;
