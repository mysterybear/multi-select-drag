import { a, useSpring } from "@react-spring/three"
import { ThreeEvent } from "@react-three/fiber"
import { useDrag } from "@use-gesture/react"
import { dispatchMove, useMoveEvent } from "./events"
import store from "./store"

type Props = {
  position: readonly [number, number]
  id: string
}

const Box = (props: Props) => {
  const [x, z] = props.position

  const [{ position }, springApi] = useSpring(
    () => ({
      position: [x, 0, z] as [number, number, number],
    }),
    [x, z]
  )

  useMoveEvent(
    ({
      detail: {
        delta: [dx, dz],
        last,
      },
    }) => {
      if (!store.selected.includes(props.id)) return
      springApi.start({ position: [x + dx, 0, z + dz] })

      if (last) {
        store.boxes[props.id] = {
          ...store.boxes[props.id],
          position: [x + dx, z + dz],
        }
      }
    }
  )

  const bind = useDrag<ThreeEvent<PointerEvent>>(
    ({ first, last, shiftKey }) => {
      if (first) {
        store.controlsEnabled = false
        if (shiftKey && !store.selected.includes(props.id)) {
          store.selected.push(props.id)
        } else {
          store.selected = [props.id]
        }
      }
      const [px, pz] = store.scratch.planeHit
      const [dx, dz] = [px - x, pz - z]

      dispatchMove([dx, dz], last)

      if (last) store.controlsEnabled = true
    }
  )

  return (
    <a.group position={position} {...(bind() as any)}>
      <mesh>
        <boxBufferGeometry />
        <meshBasicMaterial color="tomato" />
      </mesh>
    </a.group>
  )
}

export default Box
