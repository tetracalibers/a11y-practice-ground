<script lang="ts">
  import { getGalleryContext } from "./index.svelte"

  const { activeIdx, itemCount } = getGalleryContext()

  const onClickNextButton = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    activeIdx.update(curr => {
      const next = curr + 1
      return next > itemCount - 1 ? 0 : next
    })
  }
</script>

<button class="gallery-prev-next__button --next" on:click={onClickNextButton}>
  <span class="visually-hidden">Next</span>
</button>
