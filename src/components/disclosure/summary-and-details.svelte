<script lang="ts">
  interface Content {
    summary: string[]
    details: string[]
  }

  export let content: Content
  export let id: string
  export let key: number

  let opened = false

  const onSummaryClick = () => {
    opened = !opened
  }
</script>

<section class="gm-disclosure">
  <h3 class="gm-disclosure-summary">
    <button
      id={`${id}-disclosure-summary-${key}`}
      aria-controls={`${id}-disclosure-detail-${key}`}
      aria-expanded={opened}
      class="gm-disclosure-summary__button"
      on:click={onSummaryClick}
    >
      {#each content.summary as word}
        <span>{word}</span>
      {/each}
      <span class="gm-disclosure-summary__icon" data-expanded={opened} />
    </button>
  </h3>
  <div
    class="gm-disclosure-detail"
    id={`${id}-disclosure-detail-${key}`}
    data-expanded={opened}
  >
    {#each content.details as paragraph}
      <p class="gm-disclosure-detail__paragraph">{paragraph}</p>
    {/each}
  </div>
</section>

<style>
  .gm-disclosure {
    border-bottom: 1px solid #ccc;
    margin-inline: 1rem;
  }

  .gm-disclosure-summary {
    font-size: 1rem;
    font-weight: normal;
  }

  .gm-disclosure-summary__button {
    display: flex;
    gap: 1rem;
    width: 100%;
    padding: 20px;
  }

  .gm-disclosure-summary__icon {
    width: 25px;
    height: 25px;
    background-color: #cbcaca;
    border-radius: 50%;
    position: relative;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gm-disclosure-summary__icon::after {
    content: "";
    width: 9px;
    height: 9px;
    border-top: 2px solid #fff;
    border-right: 2px solid #fff;
    transform: rotate(135deg);
    margin-top: -4.5px;
  }

  .gm-disclosure-summary__icon[data-expanded="true"]::after {
    transform: rotate(315deg);
    margin-top: 4.5px;
  }

  .gm-disclosure-detail {
    background: #f3f3f3;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition-property: height, visibility, padding-top, padding-bottom;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    padding: 0 20px;
  }

  .gm-disclosure-detail[data-expanded="true"] {
    padding: 20px;
    height: auto;
    visibility: visible;
  }

  .gm-disclosure-detail__paragraph {
    margin: 0;
    padding: 0;
  }

  @keyframes slideUpDown {
    from {
      visibility: visible;
      height: 100%;
    }
    to {
      visibility: hidden;
      height: 0;
    }
  }
</style>
