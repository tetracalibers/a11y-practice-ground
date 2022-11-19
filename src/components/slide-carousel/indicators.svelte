<script lang="ts">
  import { dir } from "./carousel.store"
  import { getCarouselContext } from "./index.svelte"

  const { currIdx, itemCount } = getCarouselContext()

  export let slideId: string
  export let indicatorId: string

  const onClickIndicator = (e: MouseEvent | TouchEvent, idx: number) => {
    e.preventDefault()
    dir.set($currIdx < idx ? 1 : -1)
    currIdx.set(idx)
  }
</script>

<ul class="carousel-indicator" role="tablist">
  {#each [...new Array(itemCount)] as _, i}
    {@const isActive = $currIdx === i}
    <li class="carousel-indicator__item" role="presentation">
      <button
        class={[`carousel-indicator__button`, isActive ? "--active" : ""].join(
          " ",
        )}
        on:click={e => onClickIndicator(e, i)}
        role="tab"
        id={`${indicatorId}-${i}`}
        aria-controls={`${slideId}-${i}`}
      >
        <span class="visually-hidden">
          {`${i + 1}件目のスライド${isActive ? "（現在表示中）" : ""}`}
        </span>
      </button>
    </li>
  {/each}
</ul>

<style>
  .carousel-indicator {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .carousel-indicator__item {
    /** heightを子要素にfitさせる */
    display: flex;
  }

  .carousel-indicator__button {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #457703;
  }

  .carousel-indicator__button:hover,
  .carousel-indicator__button.--active {
    background-color: #b25938;
  }
</style>
