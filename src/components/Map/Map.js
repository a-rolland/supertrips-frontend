import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { MapContainer } from "./styles";

const Map = (props) => {
  const initialState = {
    name: props.address,
    lat: parseFloat(props.lat),
    lng: parseFloat(props.lng),
    zoom: props.zoom,
  };
  // eslint-disable-next-line
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

  const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(new maps.LatLng(place.lat, place.lng));
    });
    return bounds;
  };

  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, "idle", () => {
      maps.event.addDomListener(window, "resize", () => {
        map.fitBounds(bounds);
      });
    });
  };

  const apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
  };

  const renderMarkers = (map, maps) => {
    if (props.mapType === "tripPresentation") {
      props.allExperiencesCoords.forEach((coord) => {
        // eslint-disable-next-line
        let marker = new maps.Marker({
          position: coord,
          map,
        });
      });
    } else {
      const position = {
        lat: state.lat,
        lng: state.lng,
      };

      // eslint-disable-next-line
      let marker = new maps.Marker({
        position: position,
        map,
      });
    }
  };

  return (
    <MapContainer
      tripMap={props.tripMap}
      experienceMap={props.experienceMap}
      formMap={props.formMap}
    >
      <GoogleMapReact
        key={state.name}
        bootstrapURLKeys={{ key: `${process.env.GOOGLE_MAPS_KEY}` }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={getMapOptions}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          props.tripMap &&
            !props.hasOnlyOneLocalisation &&
            apiIsLoaded(map, maps, props.allExperiencesCoords);
          renderMarkers(map, maps);
        }}
      />
    </MapContainer>
  );
};

export default Map;
