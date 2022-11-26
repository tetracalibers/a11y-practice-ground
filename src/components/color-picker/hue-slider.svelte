<script lang="ts">
  import Slider from "./slider.svelte"
  import { Color } from "./utility/Color.type"
  import {
    getAreaXyCoordinates,
    getHueCoordinates,
  } from "./utility/coordinates"

  export let color: Color
  export let setValueFn: (h: number) => void

  const gradient = `linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)`

  $: rgb = [color.rgba.r, color.rgba.g, color.rgba.b].join(", ")
  $: coords = getHueCoordinates(color)
  $: left = (coords ?? 0) + "%"
  $: preview = `rgb(${rgb})`

  const calcFn = (e: PointerEvent) => {
    const { x, width } = getAreaXyCoordinates(e)
    const h = Math.round((x / width) * 360)
    return h
  }
</script>

<Slider
  min={0}
  max={360}
  label="hue"
  value={color.hsva.h ?? 0}
  slider={{ gradient }}
  indicator={{ left, preview }}
  {calcFn}
  {setValueFn}
/>
