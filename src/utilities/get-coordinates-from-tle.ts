import { getLatLngObj } from "tle.js";

export type Coordinates = {
  latitude: number;
  longitude: number;
  x: number;
  y: number;
  z: number;
};

export const getCoordinatesFromTle = (
  tle: string,
  timestamp: number
): Coordinates => {
  const { lat: latitude, lng: longitude } = getLatLngObj(tle, timestamp);

  const distanceFromEarthCenter = 6378 + 400;

  const x =
    (distanceFromEarthCenter *
      Math.cos((latitude * Math.PI) / 180) *
      Math.cos((longitude * Math.PI) / 180)) /
    1000;

  const y =
    (distanceFromEarthCenter * Math.sin((latitude * Math.PI) / 180)) / 1000;

  const z =
    -(
      distanceFromEarthCenter *
      Math.cos((latitude * Math.PI) / 180) *
      Math.sin((longitude * Math.PI) / 180)
    ) / 1000;

  return {
    latitude,
    longitude,
    x,
    y,
    z,
  };
};
