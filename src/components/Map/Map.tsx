import React, { FC, useCallback, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import "./Map.css";
import { defaultTheme } from "./Theme";
import { CurrentLocationMarker } from "../Markers/CurrentLocationMarker/CurrentLocationMarker";
import { MODES } from "../../App";
import { Home } from "../Markers/Home/Home";

// styles https://snazzymaps.com/

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullScreenControl: false,
  styles: defaultTheme
}

type Props = {
  center: {
    lat: number;
    lng: number;
  },
  mode: number;
  markers: any,
  onMarkerAdd: (coordinates: {lng: number, lat: number}) => void;
}

export const Map: FC<Props> = ({center, mode, markers, onMarkerAdd}) => {
  const mapRef = useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
     mapRef.current = undefined
  }, [])

  const onCLick = useCallback((loc: any) => {
    if(mode === MODES.SET_MARKERS){
     const lat = loc.latLng.lat();
     const lng = loc.latLng.lng();
     onMarkerAdd({lng, lat});
    }
  }, [mode, onMarkerAdd])

  return (
    <div className="container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onCLick}
        options={defaultOptions}
      >
       <CurrentLocationMarker position={center} />
       {markers.map((pos: any) => <Home key={pos.lng} position={pos}/>)}
      </GoogleMap>
    </div>
  );
}
