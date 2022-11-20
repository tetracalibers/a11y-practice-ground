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
  import { setContext } from "svelte"
  import { openedIdx } from "./store"

  export let headingLevel: HeadingLevel = 2

  setContext(CONTEXT_KEY, {
    headingLevel,
    openedIdx,
  })
</script>

<ul class="Accordion">
  <slot />
</ul>

<style>
  .Accordion {
    list-style: none;
  }
</style>
