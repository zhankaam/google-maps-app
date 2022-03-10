import { useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Autocomplete } from "./components/AutoComplete/AutoComplete";
import { Map } from "./components/Map/Map";
import { getBrowserLocation } from "./utils/geo";

const API_KEY = process.env.REACT_APP_API_KEY;

export const defaultCenter = {
  lat: 53.893009,
  lng: 27.567444,
};

export const MODES = {
  MOVE: 0,
  SET_MARKERS: 1,
};

function App() {
  const [center, setCenter] = useState(defaultCenter);
  const [mode, setMode] = useState(MODES.MOVE);
  const [markers, setMarkers] = useState<{ lng: number; lat: number }[]>([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY as string,
    libraries: ["places"],
  });

  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
  }, []);

  const toggleMode = useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKERS);
        break;
      case MODES.SET_MARKERS:
        setMode(MODES.MOVE);
        break;
      default:
        setMode(MODES.MOVE);
    }
  }, [mode]);

  const onMarkerAdd = (coordinates: { lng: number; lat: number }) => {
    setMarkers([...markers, coordinates]);
  };

  const clear = useCallback(() => {
    setMarkers([]);
  }, []);

  useEffect(() => {
    getBrowserLocation()
      .then((curLoc: any) => {
        setCenter(curLoc);
      })
      .catch((defaultLocation) => {
        setCenter(defaultLocation);
      });
  }, []);

  return (
    <div>
      <div className="addressSearchContainer">
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
        <button className="modeToggle" onClick={toggleMode}>
          Set Markers
        </button>
        <button className="modeToggle" onClick={clear}>
          Clear
        </button>
      </div>
      {isLoaded ? (
        <Map
          center={center}
          mode={mode}
          markers={markers}
          onMarkerAdd={onMarkerAdd}
        />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default App;
