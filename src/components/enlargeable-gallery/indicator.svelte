<script lang="ts">
  import { getGalleryContext } from "./index.svelte"

  export let idx: number

  const { activeIdx } = getGalleryContext()

  const onClickThumbnail = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    activeIdx.set(idx)
  }
</script>

<button
  type="button"
  class={["gallery-indicator", idx === $activeIdx ? "--active" : ""].join(" ")}
  on:click={onClickThumbnail}
>
  <slot />
</button>

<style>
  .gallery-indicator {
    appearance: none;
    border: none;
    background: transparent;
    transition-property: opacity;
    transition-duration: 0.35s;
    transition-timing-function: ease;
  }

  .gallery-indicator:not(.--active) {
    opacity: 0.6;
  }
</style>
