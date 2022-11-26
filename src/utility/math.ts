export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max)
}
