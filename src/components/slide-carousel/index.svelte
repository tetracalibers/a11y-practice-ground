<script lang="ts" context="module">
  import { Writable } from "svelte/store"
  import { getContext } from "svelte"

  export interface CarouselContextData {
    currIdx: Writable<number>
    dir: Writable<1 | -1>
    itemCount: number
  }

  const CONTEXT_KEY = "carousel"

  export const getCarouselContext = () =>
    getContext<CarouselContextData>(CONTEXT_KEY)
</script>

<script lang="ts">
  import { setContext } from "svelte"
  import { currIdx, dir } from "./carousel.store"
  import { ComponentType } from "svelte/internal"
  import Indicators from "./indicators.svelte"
  import NextButton from "./next-button.svelte"
  import PrevButton from "./prev-button.svelte"
  import Slider from "./slider.svelte"

  export let datalist: Record<string, unknown>[]
  export let component: ComponentType

  const itemCount = datalist.length
  const ids = {
    slideId: "carousel-slide",
    indicatorId: "carousel-control",
  }

  setContext(CONTEXT_KEY, {
    currIdx,
    dir,
    itemCount,
  })
</script>

<div class="carousel">
  <div class="carousel-content">
    <Slider {datalist} {component} {...ids} />
    <div class="carousel-prev-next">
      <PrevButton />
      <NextButton />
    </div>
  </div>
  <Indicators {...ids} />
</div>

<style>
  :global(body) {
    overflow-x: hidden;
  }

  .carousel {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .carousel-content {
    position: relative;
  }

  :global(.carousel-prev-next__button) {
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

  :global(.carousel-prev-next__button.--prev) {
    --rotate: -135deg;
    left: 2.5%;
  }

  :global(.carousel-prev-next__button.--next) {
    --rotate: 45deg;
    right: 2.5%;
  }
</style>
