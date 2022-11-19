<script lang="ts">
  import { getCarouselContext } from "./index.svelte"

  const { currIdx, itemCount, dir } = getCarouselContext()

  const onClickNextButton = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    dir.set(1)
    currIdx.update(curr => {
      const next = curr + 1
      return next > itemCount - 1 ? 0 : next
    })
  }
</script>

<button class="carousel-prev-next__button --next" on:click={onClickNextButton}>
  <span class="visually-hidden">Next</span>
</button>
