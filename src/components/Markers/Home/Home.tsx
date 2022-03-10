import { Marker } from '@react-google-maps/api';
import React, { FC } from 'react'
import { Props } from '../CurrentLocationMarker/CurrentLocationMarker';

export const Home: FC<Props> = ({ position }) => {
  return (
    <div>
      <Marker
        position={position}
        icon={{ url: "./home.svg" }}
      />
    </div>
  );
};
