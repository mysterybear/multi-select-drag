import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { pipe } from "fp-ts/lib/function"
import { map } from "fp-ts/lib/ReadonlyArray"
import { toReadonlyArray } from "fp-ts/lib/ReadonlyRecord"
import React, { Fragment, useEffect } from "react"
import { useSnapshot } from "valtio"
import Box from "./Box"
import GroundPlane from "./GroundPlane"
import store from "./store"

const ThreeApp = () => {
  const { controlsEnabled, boxes, selected } = useSnapshot(store)

  useEffect(
    () => void console.log(JSON.stringify({ selected }, null, 2)),
    [selected]
  )

  return (
    <Fragment>
      <GroundPlane />
      <group>
        {pipe(
          boxes,
          toReadonlyArray,
          map(([, { id, position }]) => (
            <Box key={id} id={id} position={position} />
          ))
        )}
        {/* {boxes.map(({ id, position }) => (
          <Box key={id} position={position} />
        ))} */}
      </group>
      <OrbitControls enabled={controlsEnabled} />
    </Fragment>
  )
}

function App() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ThreeApp />
      </Canvas>
    </div>
  )
}

export default App
