<script lang="ts">
  export let label: string
</script>

<nav aria-label={label}>
  <ul role="menubar" aria-label={label}>
    <slot />
  </ul>
</nav>
