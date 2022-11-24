<script lang="ts">
  export let href: string
</script>

<li role="presentation">
  <a role="menuitem" {href}>
    <slot />
  </a>
</li>

<style>
  [role="menuitem"] {
    display: block;
    text-decoration: none;
    padding: 20px 35px;
    color: #ccc;
  }
</style>
