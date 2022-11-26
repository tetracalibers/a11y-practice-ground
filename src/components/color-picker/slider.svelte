<script lang="ts">
  export let onChange: (e: MouseEvent | TouchEvent) => void
  export let min: number
  export let max: number
  export let value: number
  export let label: string
  export let slider: { gradient: string }
  export let indicator: { left: string; preview: string }

  let dragging = false

  const onDragStart = (e: PointerEvent) => {
    dragging = true
    onChange(e)
    e.preventDefault()
  }

  const onDrag = (e: PointerEvent) => {
    dragging && onChange(e)
    e.preventDefault()
  }

  const onDragEnd = () => {
    dragging = false
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
  on:pointerdown={onDragStart}
  on:pointermove={onDrag}
  on:pointerup={onDragEnd}
  on:pointercancel={onDragEnd}
>
  <button
    type="button"
    class="ColorPicker-slider__indicator"
    style:--preview-color={indicator.preview}
    style:--pos-x={indicator.left}
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
