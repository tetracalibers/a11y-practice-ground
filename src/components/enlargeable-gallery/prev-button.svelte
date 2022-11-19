<script lang="ts">
  import { getGalleryContext } from "./index.svelte"

  const { activeIdx, itemCount } = getGalleryContext()

  const onClickPrevButton = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    activeIdx.update(curr => {
      const prev = curr - 1
      return prev < 0 ? itemCount - 1 : prev
    })
  }
</script>

<button class="gallery-prev-next__button --prev" on:click={onClickPrevButton}>
  <span class="visually-hidden">Prev</span>
</button>
