<script lang="ts">
  import { getAccordionContext } from "./index.svelte"

  export let idx: number

  const { headingLevel, openedIdx } = getAccordionContext()
  const Heading = `h${headingLevel}` as any

  const onClickSummary = () => {
    openedIdx.set(idx)
  }
</script>

<li class="AccordionItem">
  <section class="AccordionItem-Contents">
    <svelte:element this={Heading} class="AccordionItem-Summary">
      <button
        class="AccordionItem-Summary__button"
        aria-expanded={idx === $openedIdx}
        aria-controls={`id-accordion-details-${idx}`}
        on:click={onClickSummary}
      >
        <slot name="summary" />
      </button>
    </svelte:element>
    <div
      id={`id-accordion-details-${idx}`}
      class="AccordionItem-Details"
      aria-hidden={idx !== $openedIdx}
    >
      <slot name="details" />
    </div>
  </section>
</li>

<style>
  .AccordionItem-Details[aria-hidden="true"] {
    visibility: hidden;
  }

  .AccordionItem-Summary__button {
    width: 100%;
    text-align: left;
    font-weight: normal;
    font-size: 1rem;
  }
</style>
