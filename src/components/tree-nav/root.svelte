<script lang="ts">
  import { onMount } from "svelte"
  import { Tree } from "./tree.class"

  export let title: string

  let treeEl: HTMLUListElement

  onMount(() => {
    const traverser = new Tree(treeEl)
    treeEl.addEventListener("click", traverser.onClickTreeitem, false)
    treeEl.addEventListener("keydown", traverser.onKeydownTreeitem, false)

    return () => {
      treeEl.removeEventListener("click", traverser.onClickTreeitem, false)
      treeEl.removeEventListener("keydown", traverser.onKeydownTreeitem, false)
    }
  })
</script>

<ul role="tree" aria-label={title} bind:this={treeEl}>
  <slot />
</ul>
