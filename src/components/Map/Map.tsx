import React, { FC, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import "./Map.css";
import { defaultTheme } from "./Theme";

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
  }
}

export const Map: FC<Props> = ({center}) => {
  const mapRef = useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
     mapRef.current = undefined
  }, [])

  return (
    <div className="container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  );
}
