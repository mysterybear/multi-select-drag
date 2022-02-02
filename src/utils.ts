import { ThreeEvent } from "@react-three/fiber"
import { pipe } from "fp-ts/lib/function"
import { map as mapO } from "fp-ts/lib/Option"
import { head } from "fp-ts/lib/ReadonlyArray"
import { MutableRefObject } from "react"
import { Intersection, Object3D } from "three"

export const guardRef = (
  r: MutableRefObject<Object3D | undefined>
): r is MutableRefObject<Object3D> => Boolean(r.current)

export const nearestMap = (
  event: ThreeEvent<PointerEvent>,
  meshRef: MutableRefObject<Object3D | undefined>,
  f: (ix: Intersection) => void
) => {
  if (!guardRef(meshRef)) return
  return pipe(
    event.intersections,
    head,
    mapO((ix) => {
      if ((ix.eventObject || ix.object).uuid !== meshRef.current.uuid) return
      else f(ix)
    })
  )
}
