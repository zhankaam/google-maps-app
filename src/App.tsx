import { useJsApiLoader } from '@react-google-maps/api';
import React from 'react';
import './App.css';
import { Autocomplete } from './components/AutoComplete/AutoComplete';
import { Map } from './components/Map/Map';

const API_KEY = process.env.REACT_APP_API_KEY;

const center = {
  lat: 53.893009,
  lng: 27.567444
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY as string,
    libraries: ["places"]
  })


  return (
    <div>
      <div className="addressSearchContainer">
        <Autocomplete isLoaded={isLoaded}/>
        </div>
      {isLoaded ? <Map center={center} /> : <h2>Loading...</h2>}
    </div>
  );
}

export default App;
