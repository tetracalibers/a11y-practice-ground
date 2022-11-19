<script lang="ts">
  export let href: string
</script>

<li role="presentation">
  <!-- svelte-ignore a11y-role-has-required-aria-props -->
  <a role="treeitem" {href} aria-current="false" tabindex="-1">
    <slot />
  </a>
</li>
