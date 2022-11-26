<script lang="ts">
  import { clamp } from "@/utility/math"

  export let calcFn: (e: MouseEvent | TouchEvent) => number
  export let setValueFn: (value: number) => void
  export let min: number
  export let max: number
  export let step = 1
  export let largeStep = step * 10
  export let value: number
  export let label: string
  export let slider: { gradient: string }
  export let indicator: { left: string; preview: string }

  let dragging = false

  const onChange = (e: MouseEvent | TouchEvent) => {
    const value = calcFn(e)
    setValueFn(value)
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

  const onKeyDownIndicator = (e: KeyboardEvent) => {
    const key = e.key
    switch (key) {
      case "Right":
      case "ArrowRight":
      case "Up":
      case "ArrowUp":
        setValueFn(clamp(value + step, min, max))
        return
      case "Left":
      case "ArrowLeft":
      case "Down":
      case "ArrowDown":
        setValueFn(clamp(value - step, min, max))
        return
      case "PageUp":
        setValueFn(clamp(value + largeStep, min, max))
        return
      case "PageDown":
        setValueFn(clamp(value - largeStep, min, max))
        return
      case "Home":
        setValueFn(max)
        return
      case "End":
        setValueFn(min)
        return
      default:
        return
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="ColorPicker-slider"
  style:--gradient={slider.gradient}
  role="slider"
  aria-valuenow={value}
  aria-valuemin={min}
  aria-valuemax={max}
  aria-label={label}
  on:click={onChange}
  on:mousedown={onDragStart}
  on:mousemove={onDrag}
  on:mouseup={onDragEnd}
  on:touchstart={onDragStart}
  on:touchmove={onDrag}
  on:touchend={onDragEnd}
>
  <button
    type="button"
    class="ColorPicker-slider__indicator"
    style:--preview-color={indicator.preview}
    style:--pos-x={indicator.left}
    on:keydown={onKeyDownIndicator}
  />
</div>

<style>
  .ColorPicker-slider {
    --height: 25px;
    --indicator-size: calc(var(--height) * 1.25);

    width: 100%;
    height: var(--height);
    border-radius: 4px;
    background-image: var(--gradient);
    position: relative;
    cursor: crosshair;
  }

  .ColorPicker-slider__indicator {
    appearance: none;
    width: var(--indicator-size);
    height: var(--indicator-size);
    border: 2px solid #fff;
    border-radius: 50%;
    transform: translate(
      -50%,
      calc(var(--height) * 0.5 - var(--indicator-size) * 0.5)
    );
    position: absolute;
    left: var(--pos-x);
    background-color: var(--preview-color);
    cursor: crosshair;
  }
</style>
