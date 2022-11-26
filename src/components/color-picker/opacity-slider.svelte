<script lang="ts">
  import Slider from "./slider.svelte"
  import { Color } from "./utility/Color.type"

  export let color: Color
  export let onChange: (e: PointerEvent) => void

  $: rgb = [color.rgba.r, color.rgba.g, color.rgba.b].join(", ")
  $: gradient = `linear-gradient(to left, rgba(${rgb}, 1), rgba(${rgb}, 0))`
  $: left = (color.hsva.a ?? 100) + "%"
  $: preview = `rgb(${rgb})`
</script>

<Slider
  min={0}
  max={100}
  label="opacity"
  value={color.rgba.a ?? 100}
  slider={{ gradient }}
  indicator={{ left, preview }}
  {onChange}
/>
