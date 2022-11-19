<script lang="ts">
  interface Link {
    url: string
    label: string
  }

  interface TabItem {
    id: string
    title: string
    links: Link[]
  }

  interface TabContents {
    title: string
    items: TabItem[]
  }

  export let contents: TabContents

  const tabs: HTMLButtonElement[] = []
  const tabsLastIdx = contents.items.length - 1
  let activeIdx = 0
  let focusedIdx = 0

  const focusTab = (idx: number) => {
    tabs[idx]?.focus()
  }

  const focusNextTab = () => {
    let nextIdx = focusedIdx + 1
    if (nextIdx > tabsLastIdx) {
      nextIdx = 0
    }
    focusTab(nextIdx)
  }

  const focusPrevTab = () => {
    let prevIdx = focusedIdx - 1
    if (prevIdx < 0) {
      prevIdx = tabsLastIdx
    }
    focusTab(prevIdx)
  }

  const onFocusTab = (idx: number) => {
    focusedIdx = idx
  }

  const onClickTab = (idx: number) => {
    if (activeIdx === idx) return
    activeIdx = idx
  }

  const onKeydownTab = (e: KeyboardEvent) => {
    const key = e.key
    switch (key) {
      case "ArrowRight":
      case "Right":
        focusNextTab()
        break
      case "ArrowLeft":
      case "Left":
        focusPrevTab()
        break
      case "Home":
        focusTab(0)
        break
      case "End":
        focusTab(tabsLastIdx)
        break
    }
  }
</script>

<div class="gm-tabs">
  <ul class="gm-tabs-tablist" role="tablist" aria-label={contents.title}>
    {#each contents.items as { id, title }, i}
      {@const isActive = activeIdx === i}
      <li class="gm-tabs-tablist__item" role="presentation">
        <button
          type="button"
          role="tab"
          id={`gm-tab-${id}`}
          aria-controls={`gm-tabpanel-${id}`}
          aria-selected={isActive}
          tabIndex={isActive ? 0 : -1}
          bind:this={tabs[i]}
          on:click={() => onClickTab(i)}
          on:focus={() => onFocusTab(i)}
          on:keydown={onKeydownTab}
        >
          {title}
        </button>
      </li>
    {/each}
  </ul>
  <div class="gm-tabs-panels">
    {#each contents.items as { id, links }, i}
      {@const isActive = activeIdx === i}
      <div
        class="gm-tabs-panel"
        id={`gm-tabpanel-${id}`}
        role="tabpanel"
        aria-labelledby={`gm-tab-${id}`}
        aria-hidden={!isActive}
        tabIndex={isActive ? 0 : -1}
      >
        <ul class="gm-tabs-panel__content gm-category-links">
          {#each links as { url, label }}
            <li class="gm-category-links__item">
              <a href={url}>{label}</a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>

<style>
  .gm-tabs {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .gm-tabs-tablist {
    display: flex;
  }

  .gm-tabs-tablist__item {
    flex-grow: 1;
    text-align: center;
  }

  .gm-tabs-tablist__item button {
    padding: 10px;
    width: 100%;
  }

  .gm-tabs-tablist__item button[aria-selected="true"] {
    border-bottom: #457703 2px solid;
  }

  .gm-tabs-panel {
    display: none;
    opacity: 0;
  }

  .gm-tabs-panel[aria-hidden="false"] {
    display: block;
    opacity: 1;
    animation-name: fade;
    animation-duration: 2s;
    animation-fill-mode: forwards;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .gm-category-links__item a {
    display: block;
    padding: 10px;
    padding-left: 20px;
    border-bottom: 1px solid #ccc;
  }

  .gm-category-links__item a:hover {
    background: #efefef;
  }
</style>
