<script lang="ts" context="module">
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"

  export interface LightBoxContextData {
    activeIdx: Writable<number>
    itemCount: number
  }

  const CONTEXT_KEY = "gallery"

  export const getGalleryContext = () =>
    getContext<LightBoxContextData>(CONTEXT_KEY)
</script>

<script lang="ts">
  import type { ComponentType } from "svelte"
  import { setContext } from "svelte"
  import NextButton from "./next-button.svelte"
  import PrevButton from "./prev-button.svelte"
  import { activeIdx } from "./store"
  import Indicator from "./indicator.svelte"

  export let enlargedComponent: ComponentType
  export let thumbComponent: ComponentType
  export let propslist: Record<string, unknown>[]

  const itemCount = propslist.length
  const ActiveImage = enlargedComponent
  const IndicatorImage = thumbComponent

  setContext(CONTEXT_KEY, {
    activeIdx,
    itemCount,
  })
</script>

<div class="gallery">
  <div class="gallery-main">
    <div class="gallery-main__images" style={`--active-idx: ${$activeIdx}`}>
      {#each propslist as props, i}
        <div class="gallery-main__image-wrapper" aria-hidden={i !== $activeIdx}>
          <ActiveImage {...props} />
        </div>
      {/each}
    </div>
    <div class="gallery-prev-next">
      <PrevButton />
      <NextButton />
    </div>
  </div>
  <div class="gallery-thumbnails">
    {#each propslist as props, i}
      <Indicator idx={i}>
        <IndicatorImage {...props} />
      </Indicator>
    {/each}
  </div>
</div>

<style>
  .gallery {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .gallery-main {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .gallery-main__images {
    /* 全ての画像を重ねるための指定 */
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .gallery-main__image-wrapper {
    /* どの画像も同じセルに配置 */
    grid-column: 1;
    grid-row: 1;
    /* fadeIn, fadeOut */
    transition-property: opacity, visibility;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    visibility: visible;
    opacity: 1;
  }

  /* fadeIn, fadeOut */
  .gallery-main__image-wrapper[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
  }

  /** 4列 */
  .gallery-thumbnails {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(23%, 1fr));
    gap: 2%;
    width: 100%;
  }

  /* 2列 */
  @media screen and (max-width: 350px) {
    .gallery-thumbnails {
      grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
    }
  }

  :global(.gallery-prev-next__button) {
    --arrow-color: #fff;
    width: 25px;
    height: 25px;
    position: absolute;
    top: 50%;
    border-top: 3px solid var(--arrow-color);
    border-right: 3px solid var(--arrow-color);
    transform: translateY(-50%) rotate(var(--rotate));
    background-color: transparent;
  }

  :global(.gallery-prev-next__button.--prev) {
    --rotate: -135deg;
    left: 2.5%;
  }

  :global(.gallery-prev-next__button.--next) {
    --rotate: 45deg;
    right: 2.5%;
  }
</style>
