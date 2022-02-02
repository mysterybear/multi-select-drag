import useEventListener from "@use-it/event-listener"

export type MoveEvent = {
  detail: {
    delta: [number, number]
    last: boolean
  }
}

export const MOVE_EVENT = "MOVE_EVENT"

export const dispatchMove = (delta: [number, number], last: boolean = false) =>
  dispatchEvent(
    new CustomEvent(MOVE_EVENT, { detail: { delta, last } } as MoveEvent)
  )

export const useMoveEvent = (handler: (ev: MoveEvent) => void) =>
  useEventListener(MOVE_EVENT, (event) => handler(event as any))
