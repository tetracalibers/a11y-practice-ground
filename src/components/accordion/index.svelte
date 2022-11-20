<script lang="ts" context="module">
  import { HeadingLevel } from "@/types/html"
  import { Writable } from "svelte/store"
  import { getContext } from "svelte"

  export interface AccordionContextData {
    headingLevel: HeadingLevel
    openedIdx: Writable<number>
  }

  const CONTEXT_KEY = "accordion"

  export const getAccordionContext = () => {
    return getContext<AccordionContextData>(CONTEXT_KEY)
  }
</script>

<script lang="ts">
  import { setContext, onMount } from "svelte"
  import { openedIdx } from "./store"
  import { FocusManager } from "@/utility/FocusManager.class"
  import { getChildrenArray } from "@/utility/dom"

  export let headingLevel: HeadingLevel = 2

  let rootEl: HTMLElement

  setContext(CONTEXT_KEY, {
    headingLevel,
    openedIdx,
  })

  onMount(() => {
    const expandables = getChildrenArray(rootEl, "[aria-expanded]")
    const targetCondition = (el: HTMLElement) =>
      el.hasAttribute("aria-expanded")
    const focusManager = new FocusManager(expandables, targetCondition)

    rootEl.addEventListener("keydown", focusManager.onKeyDown, false)

    return () => {
      rootEl.removeEventListener("keydown", focusManager.onKeyDown, false)
    }
  })
</script>

<ul class="Accordion" bind:this={rootEl}>
  <slot />
</ul>

<style>
  .Accordion {
    list-style: none;
  }
</style>
