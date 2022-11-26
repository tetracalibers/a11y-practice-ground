import { clamp } from "@/utility/math"
import { getPointerPos } from "@/utility/media"
import { Color } from "./Color.type"

export const getSaturationCoordinates = (color: Color): [number, number] => {
  const { s, v } = color.hsva
  const x = s
  const y = 100 - v
  return [x, y]
}

export const getHueCoordinates = (color: Color): number => {
  const { h } = color.hsva
  const x = (h / 360) * 100
  return x
}

export const getAreaXyCoordinates = (e: MouseEvent | TouchEvent) => {
  const el = e.currentTarget as HTMLElement
  const { width, height, left, top } = el.getBoundingClientRect()
  const { clientX, clientY } = getPointerPos(e)
  const x = clamp(clientX - left, 0, width)
  const y = clamp(clientY - top, 0, height)
  return { x, y, width, height }
}
