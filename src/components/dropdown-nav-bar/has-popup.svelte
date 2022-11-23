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
    tabindex="-1"
  >
    {title}
  </button>
  <ul role="menu" aria-label={title} id={`id-dropdown-nav-submenu-${title}`}>
    <slot />
  </ul>
</li>

<style>
  [role="menuitem"] {
    display: block;
    text-decoration: none;
    padding: 20px 35px;
    width: 100%;
    text-align: left;
    color: #ccc;
  }

  [aria-haspopup="true"]::before {
    content: "＋";
  }

  [role="presentation"] {
    position: relative;
  }

  [aria-expanded] ~ ul {
    position: absolute;
    width: max-content;
    top: 100%;
    left: 0;
    background: #28bfe7;
  }

  :global([role="menuitem"][aria-expanded][data-depth]:not([data-depth="1"])
      ~ ul) {
    top: 0;
    left: 100%;
    background: #66adf5;
    margin-left: 2px;
  }

  :global([role="menuitem"][aria-expanded][data-depth] ~ ul [role="menuitem"]) {
    color: #fff;
  }

  [aria-expanded="false"] ~ ul {
    display: none;
  }
</style>
