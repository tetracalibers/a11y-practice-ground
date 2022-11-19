<script lang="ts">
  export let subTreeTitle: string
</script>

<!-- svelte-ignore a11y-role-has-required-aria-props -->
<li role="presentation">
  <button
    role="treeitem"
    aria-expanded="false"
    aria-owns={`${subTreeTitle}-subtree`}
    tabindex="-1"
  >
    ＋{subTreeTitle}
  </button>
  <ul id={`${subTreeTitle}-subtree`} role="group" aria-label={subTreeTitle}>
    <slot />
  </ul>
</li>

<style>
  [aria-expanded="false"] ~ ul {
    display: none;
  }

  li {
    padding-left: 2em;
  }

  :global(ul[role="group"] > li) {
    padding-left: 2em;
  }
</style>
