import { proxy, ref } from "valtio"

type Store = {
  controlsEnabled: boolean
  boxes: {
    [id: string]: {
      id: string
      position: [number, number]
    }
  }
  selected: string[]
  scratch: {
    planeHit: [number, number]
  }
}

const store = proxy<Store>({
  controlsEnabled: true,
  boxes: {
    foo: {
      id: "foo",
      position: [0, 0] as [number, number],
    },
    bar: {
      id: "bar",
      position: [5, 5] as [number, number],
    },
  },
  selected: [],
  scratch: ref({
    planeHit: [0, 0],
  }),
})

export default store
