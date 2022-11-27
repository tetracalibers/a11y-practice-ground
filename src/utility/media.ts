export const isTouchEvent = (e: MouseEvent | TouchEvent): e is TouchEvent =>
  "TouchEvent" in window && e instanceof TouchEvent

export const getPointerPos = (e: MouseEvent | TouchEvent) => {
  const { clientX, clientY } = isTouchEvent(e) ? e.touches[0] : e
  return { clientX, clientY }
}
