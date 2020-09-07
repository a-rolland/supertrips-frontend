import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { MapContainer } from "./styles";

const Map = (props) => {
  const initialState = {
    name: props.address,
    lat: props.lat,
    lng: props.lng,
    zoom: props.zoom
  };
  const [state, setState] = useState(initialState);

  const center = {
    lat: state.lat,
    lng: state.lng,
  };

  const zoom = parseInt(state.zoom);

  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: false,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    };
  };

  const renderMarkers = (map, maps) => {
    const position = {
      lat: state.lat,
      lng: state.lng,
    };

    let marker = new maps.Marker({
      position: position,
      map,
    });
  };

  return (
    <MapContainer tripMap={props.tripMap} experienceMap={props.experienceMap}>
      <GoogleMapReact
        key={state.name}
        bootstrapURLKeys={ { key: ''} }
        defaultCenter={center}
        defaultZoom={zoom}
        options={getMapOptions}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      />
    </MapContainer>
  );
};

export default Map;
