interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export const PathComponent = ({
  coordinates = { x: 0, y: 0, z: 0 },
}: {
  coordinates: Coordinates;
}) => {
  return (
    <mesh position={[coordinates.x, coordinates.y, coordinates.z]}>
      <sphereGeometry args={[0.03, 30, 30]} />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  );
};
