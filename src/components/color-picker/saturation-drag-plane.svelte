<script lang="ts">
  import { Color } from "./utility/Color.type"
  import {
    getAreaXyCoordinates,
    getSaturationCoordinates,
  } from "./utility/coordinates"

  export let color: Color
  export let setValueFn: (s: number, v: number) => void

  $: rgb = [color.rgba.r, color.rgba.g, color.rgba.b].join(", ")
  $: coords = getSaturationCoordinates(color)
  $: bgColor = `hsl(${color.hsva.h}, 100%, 50%)`
  $: preview = `rgb(${rgb})`

  const calcFn = (e: MouseEvent | TouchEvent): [number, number] => {
    const { x, y, width, height } = getAreaXyCoordinates(e)
    const s = (x / width) * 100
    const v = 100 - (y / height) * 100
    return [s, v]
  }

  let dragging = false

  const onChange = (e: MouseEvent | TouchEvent) => {
    const values = calcFn(e)
    setValueFn(...values)
  }

  const onDragStart = (e: MouseEvent | TouchEvent) => {
    dragging = true
    onChange(e)
    e.preventDefault()
  }

  const onDrag = (e: MouseEvent | TouchEvent) => {
    dragging && onChange(e)
    e.preventDefault()
  }

  const onDragEnd = (e: MouseEvent | TouchEvent) => {
    dragging = false
    e.preventDefault()
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="ColorPicker-xy-picker-plane"
  style:--bg-color={bgColor}
  role="application"
  aria-label="Saturation and brightness"
  on:click={onChange}
  on:mousedown={onDragStart}
  on:mousemove={onDrag}
  on:mouseup={onDragEnd}
  on:touchstart={onDragStart}
  on:touchmove={onDrag}
  on:touchend={onDragEnd}
>
  <div class="visually-hidden">
    Use up, down, left and right arrow keys to select.
  </div>
  <button
    type="button"
    class="ColorPicker-xy-picker-plane__indicator"
    style:--preview-color={preview}
    style:--pos-x={(coords?.[0] ?? 0) + "%"}
    style:--pos-y={(coords?.[1] ?? 0) + "%"}
  />
</div>

<style>
  .ColorPicker-xy-picker-plane {
    --indicator-size: 15px;

    width: 100%;
    height: 150px;
    background-image: linear-gradient(transparent, black),
      linear-gradient(to right, white, transparent);
    background-color: var(--bg-color);
    border-radius: 4px;
    position: relative;
    cursor: crosshair;
  }

  .ColorPicker-xy-picker-plane__indicator {
    width: var(--indicator-size);
    height: var(--indicator-size);
    border: 2px solid #ffffff;
    background-color: var(--preview-color);
    border-radius: 50%;
    transform: translate(
      calc(var(--indicator-size) * -0.5),
      calc(var(--indicator-size) * -0.5)
    );
    position: absolute;
    left: var(--pos-x);
    top: var(--pos-y);
  }
</style>
