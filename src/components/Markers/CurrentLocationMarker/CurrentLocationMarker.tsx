import React, { FC } from "react";
import { Marker } from "@react-google-maps/api";

export type Props = {
  position: {
    lat: number;
    lng: number;
  };
};

export const CurrentLocationMarker: FC<Props> = ({ position }) => {
  return (
    <div>
      <Marker
        position={position}
        icon={{ url: "./spongebob-squarepants.svg" }}
      />
    </div>
  );
};
