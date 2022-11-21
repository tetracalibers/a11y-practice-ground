<script lang="ts">
  export let title: string
</script>

<li role="presentation">
  <button
    type="button"
    role="menuitem"
    aria-haspopup="true"
    aria-expanded="false"
    aria-controls={`id-dropdown-nav-submenu-${title}`}
  >
    {title}
  </button>
  <ul role="menu" aria-label={title} id={`id-dropdown-nav-submenu-${title}`}>
    <slot />
  </ul>
</li>

<style>
  li {
    padding-left: 2em;
  }
</style>
