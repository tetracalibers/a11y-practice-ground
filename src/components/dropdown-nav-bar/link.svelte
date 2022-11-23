<script lang="ts">
  export let href: string
</script>

<li role="presentation">
  <a role="menuitem" {href} tabindex="-1">
    <slot />
  </a>
</li>

<style>
  li {
    padding-left: 2em;
  }
</style>
