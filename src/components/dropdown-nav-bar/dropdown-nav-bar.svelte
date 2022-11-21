<script lang="ts">
  import { onMount } from "svelte"
  import { DropdownNav } from "./dropdown-nav.class"

  export let label: string

  let menubarEl: HTMLElement

  onMount(() => {
    const controller = new DropdownNav(menubarEl)
    menubarEl.addEventListener("keydown", controller.onKeydownMenuitem, false)

    return () => {
      menubarEl.removeEventListener(
        "keydown",
        controller.onKeydownMenuitem,
        false,
      )
    }
  })
</script>

<nav aria-label={label}>
  <ul role="menubar" aria-label={label} bind:this={menubarEl}>
    <slot />
  </ul>
</nav>
