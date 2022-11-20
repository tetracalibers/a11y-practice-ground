<script lang="ts">
  import Accordion from "@/components/accordion/index.svelte"
  import Item from "@/components/accordion/item.svelte"
  import { faq } from "@/utility/dummy"
</script>

<div class="FAQ-List">
  <Accordion>
    {#each faq as item, i}
      <Item idx={i}>
        <span slot="summary" class="FAQ-Question">{item.question}</span>
        <div slot="details" class="FAQ-Answer">{item.answer}</div>
      </Item>
    {/each}
  </Accordion>
</div>

<style>
  .FAQ-List :global(.Accordion) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .FAQ-List :global(.AccordionItem-Contents) {
    border: 1px solid #ccc;
  }

  .FAQ-Question {
    display: block;
    padding: 3% 3% 3% 50px;
    position: relative;
  }

  .FAQ-Question::before,
  .FAQ-Question::after {
    position: absolute;
    content: "";
    width: 15px;
    height: 2px;
    background-color: #333;
  }

  .FAQ-Question::before {
    top: 48%;
    left: 15px;
    transform: rotate(0deg);
  }

  .FAQ-Question::after {
    top: 48%;
    left: 15px;
    transform: rotate(90deg);
  }

  :global([aria-expanded="true"]) > .FAQ-Question::before {
    transform: rotate(45deg);
  }

  :global([aria-expanded="true"]) > .FAQ-Question::after {
    transform: rotate(-45deg);
  }

  .FAQ-Answer {
    transition: margin-top 0.5s ease, margin-bottom 0.5s ease,
      padding-top 0.5s ease, padding-bottom 0.5s ease, line-height 0.5s ease,
      opacity 0.1s linear, visibility 0.1s linear;
    background: #f3f3f3;
    margin: 0 3% 3% 3%;
    padding: 3%;
    opacity: 1;
    visibility: visible;
    overflow: hidden;
  }

  :global([aria-hidden="true"]) > .FAQ-Answer {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 0;
    opacity: 0;
    visibility: hidden;
  }
</style>
