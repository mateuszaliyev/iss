import { Suspense, useRef } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { getLatLngObj } from "tle.js";

import { useIss } from "@/hooks/iss";

import { trpc } from "@/utilities/trpc";

// const Node = ({
//   node,
//   position,
// }: {
//   node: Object3D<Event>;
//   position?: Vector3;
// }) => {
//   if (node.isGroup) {
//     return (
//       <>
//         {node.children.map((child) => (
//           <Node
//             key={child.name}
//             node={child}
//             // position={node.position.applyMatrix4(node.matrix)}
//             position={node.position}
//           />
//         ))}
//       </>
//     );
//   }

//   return (
//     <mesh
//       castShadow
//       geometry={node.geometry}
//       material={node.material}
//       position={position}
//       receiveShadow
//     />
//   );
// };

// export const Model = () => {
//   const group = useRef<Group>(null);
//   const { materials, nodes } = useGLTF("/assets/models/iss47.gltf");

//   return (
//     <group dispose={null} ref={group} scale={[0.001, 0.001, 0.001]}>
//       {Object.entries(nodes).map(([name, node]) => (
//         <Node key={name} node={node} />
//       ))}{" "}
//       <primitive
//         object={gltf.scene}
//         ref={issRef}
//         scale={[0.001, 0.001, 0.001]}
//       />
//     </group>
//   );
// };

// useGLTF.preload("/assets/models/iss47.gltf");

export const Iss = () => {
  const { data: tle } = trpc.iss.tle.useQuery();

  const issRef = useRef<Mesh>(null);

  const { setPosition } = useIss();

  const gltf = useLoader(GLTFLoader, "/assets/models/iss47.gltf");

  // const obj = useLoader(OBJLoader, "/assets/models/untitled.obj");

  // useEffect(() => {
  //   if (!issRef.current) {
  //     return;
  //   }

  //   let hasRun = false;

  //   if (!hasRun) {
  //     issRef.current.traverse((object) => (object.frustumCulled = false));
  //     hasRun = true;
  //   }
  // }, []);

  useFrame(() => {
    if (!tle || !issRef.current) {
      return;
    }

    const { lat: latitude, lng: longitude } = getLatLngObj(tle, Date.now());

    const distanceFromEarthCenter = 6378 + 400;

    const x =
      (distanceFromEarthCenter *
        Math.cos((latitude * Math.PI) / 180) *
        Math.cos((longitude * Math.PI) / 180)) /
      1000;

    const y =
      -(
        distanceFromEarthCenter *
        Math.cos((latitude * Math.PI) / 180) *
        Math.sin((longitude * Math.PI) / 180)
      ) / 1000;

    const z =
      (distanceFromEarthCenter * Math.sin((latitude * Math.PI) / 180)) / 1000;

    // const x =
    //   (distanceFromEarthCenter *
    //     Math.cos((latitude * Math.PI) / 180) *
    //     Math.cos((longitude * Math.PI) / 180)) /
    //   1000;

    // const y =
    //   (distanceFromEarthCenter *
    //     Math.cos((latitude * Math.PI) / 180) *
    //     Math.sin((longitude * Math.PI) / 180)) /
    //   1000;

    // const z =
    //   (distanceFromEarthCenter * Math.sin((latitude * Math.PI) / 180)) / 1000;

    setPosition({ x, y, z });

    issRef.current.position.set(x, y, z);
  });

  return (
    <Suspense fallback={null}>
      {/* <Model /> */}
      <primitive
        object={gltf.scene}
        ref={issRef}
        scale={[0.001, 0.001, 0.001]}
      />
      {/* <primitive object={obj} scale={[0.001, 0.001, 0.001]} /> */}
    </Suspense>
  );
};
