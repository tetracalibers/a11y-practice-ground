<script lang="ts">
  import { getCarouselContext } from "./index.svelte"

  export let idx: number
  export let id = ""
  export let indicatorId = ""

  const { currIdx, dir } = getCarouselContext()

  const staticAttrs = Object.fromEntries(
    Object.entries({ id, "aria-describedby": indicatorId })
      .filter(([_k, v]) => v.length > 0)
      .map(([k, v]) => [k, `${v}-${idx}`]),
  )

  let isCurrent: boolean
  let isPrev: boolean
  let isNext: boolean
  let dynamicAttrs: Record<string, unknown> = {}

  currIdx.subscribe(curr => {
    isCurrent = idx === curr
    isPrev = curr - idx === 1
    isNext = idx - curr === 1
    dynamicAttrs = !isCurrent ? { inert: true } : {}
  })
</script>

<div
  {...staticAttrs}
  {...dynamicAttrs}
  class={[
    "carousel-slide__item",
    isCurrent ? "--current" : "",
    isPrev ? "--prev" : "",
    isNext ? "--next" : "",
  ].join(" ")}
  style={[`--idx: ${idx}`, `--dir: ${$dir}`].join(";")}
>
  <slot />
</div>

<style>
  .carousel-slide__item {
    --slide-duration: 0.5s;

    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 100%;
    perspective: 1000px;
  }

  .carousel-slide__item.--current {
    transform: scale(1) translateX(0);
    animation: current var(--slide-duration);
  }

  .carousel-slide__item.--prev {
    transform: scale(0.8) translateX(0);
    animation: prev var(--slide-duration);
  }

  .carousel-slide__item.--next {
    transform: translateX(0) scale(0.8);
    animation: next var(--slide-duration);
  }

  @keyframes current {
    from {
      transform: scale(0.8)
        translateX(calc(var(--dir, 1) * var(--slide-width) * 0.8));
    }
    to {
      transform: scale(1) translateX(0);
    }
  }

  @keyframes prev {
    from {
      transform: scale(1)
        translateX(calc(var(--dir, 1) * var(--slide-width) * 0.8));
    }
    to {
      transform: scale(0.8) translateX(0px);
    }
  }

  @keyframes next {
    from {
      transform: translateX(calc(var(--dir, 1) * var(--slide-width) * 0.8))
        scale(1);
    }
    to {
      transform: translateX(0px) scale(0.8);
    }
  }
</style>
