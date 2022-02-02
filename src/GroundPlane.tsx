import { ThreeEvent } from "@react-three/fiber"
import { useGesture } from "@use-gesture/react"
import { useRef } from "react"
import { DoubleSide, Mesh } from "three"
import store from "./store"
import { nearestMap } from "./utils"

type Props = {
  planeSize?: number
}

const GroundPlane = ({ planeSize = 5000 }: Props) => {
  const meshRef = useRef<Mesh>()
  const bind = useGesture<{
    onPointerMove: ThreeEvent<PointerEvent>
    onPointerDown: ThreeEvent<PointerEvent>
  }>({
    onPointerMove: ({ event: { uv } }) => {
      if (!uv) return
      store.scratch.planeHit = [
        uv.x * planeSize - planeSize / 2,
        -(uv.y * planeSize - planeSize / 2),
      ]
    },
    onPointerDown: ({ event }) => {
      nearestMap(event, meshRef, () => {
        store.selected = []
      })
    },
  })

  return (
    <mesh ref={meshRef} {...(bind() as any)} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[planeSize, planeSize, 1, 1]} />
      <meshBasicMaterial color="gray" side={DoubleSide} />
    </mesh>
  )
}
export default GroundPlane
