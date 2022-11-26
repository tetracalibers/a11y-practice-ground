export const getPointerPos = (e: MouseEvent | TouchEvent) => {
  const touchObject = (e as TouchEvent).changedTouches?.[0]
  const { clientX, clientY } =
    touchObject === undefined ? (e as MouseEvent) : touchObject
  return { clientX, clientY }
}
