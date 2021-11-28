// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import {
//   Canvas,
//   extend,
//   useFrame,
//   useLoader,
//   useThree,
// } from "@react-three/fiber";
// import circleImg from "../assets/circle.png";
// import React, {
//   Suspense,
//   useCallback,
//   useMemo,
//   useRef,
//   useContext,
//   useEffect,
// } from "react";

// import { store } from "../state";

// extend({ OrbitControls });

// function CameraControls() {
//   const {
//     camera,
//     gl: { domElement },
//   } = useThree();

//   const controlsRef = useRef();
//   useFrame(() => controlsRef.current.update());

//   return (
//     <orbitControls
//       ref={controlsRef}
//       args={[camera, domElement]}
//       autoRotate
//       autoRotateSpeed={-0.2}
//     />
//   );
// }

// function Points({ state }) {
//   // console.log("INSIDE POINTS", state);

//   const imgTex = useLoader(THREE.TextureLoader, circleImg);
//   const bufferRef = useRef();

//   let t = 0;
//   let f = state.freqTable[state.noteObj.note] / 100000;
//   let a = 3;

//   const graph = useCallback(
//     (x, z) => {
//       return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
//     },
//     [t, f, a]
//   );

//   console.log(graph);

//   const count = 100;
//   const dotSeparation = 1;
//   let positions = useMemo(() => {
//     let positions = [];

//     for (let xi = 0; xi < count; xi++) {
//       for (let zi = 0; zi < count; zi++) {
//         let x = dotSeparation * (xi - count / 2);
//         let z = dotSeparation * (zi - count / 2);
//         let y = graph(x, z);
//         positions.push(x, y, z);
//       }
//     }

//     return new Float32Array(positions);
//   }, [count, dotSeparation, graph, state.noteObj.note]);

//   useFrame(() => {
//     t += 15;

//     const positions = bufferRef.current.array;

//     let i = 0;
//     for (let xi = 0; xi < count; xi++) {
//       for (let zi = 0; zi < count; zi++) {
//         let x = dotSeparation * (xi - count / 2);
//         let z = dotSeparation * (zi - count / 2);

//         positions[i + 1] = graph(x, z);
//         i += 3;
//       }
//     }

//     bufferRef.current.needsUpdate = true;
//   });

//   return (
//     <points>
//       <bufferGeometry attach="geometry">
//         <bufferAttribute
//           ref={bufferRef}
//           attachObject={["attributes", "position"]}
//           array={positions}
//           count={positions.length / 3}
//           itemSize={3}
//         />
//       </bufferGeometry>

//       <pointsMaterial
//         attach="material"
//         map={imgTex}
//         color={0x00aaff}
//         size={0.5}
//         sizeAttenuation
//         transparent={false}
//         alphaTest={0.5}
//         opacity={1.0}
//       />
//     </points>
//   );
// }

// function AnimationCanvas() {
//   const { state, dispatch } = useContext(store);

//   return (
//     <Canvas
//       colorManagement={false}
//       camera={{ position: [100, 10, 0], fov: 75 }}
//     >
//       <Suspense fallback={null}>
//         <Points state={state} />
//       </Suspense>
//       <CameraControls />
//     </Canvas>
//   );
// }

// function WaveBkg(props) {
//   return (
//     <div className="anime">
//       <Suspense className="canvas-parent" fallback={<div>Loading...</div>}>
//         <AnimationCanvas />
//       </Suspense>
//     </div>
//   );
// }

// export default WaveBkg;
