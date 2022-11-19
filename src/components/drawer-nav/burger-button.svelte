<script lang="ts">
  export let opened: boolean
  export let navid: string
  export let el: HTMLButtonElement
</script>

<button
  on:click
  bind:this={el}
  class="burger-btn"
  type="button"
  aria-expanded={opened}
  aria-controls={navid}
>
  <div class="burger-btn-icon">
    <span class="burger-btn-icon__line --line-1" />
    <span class="burger-btn-icon__line --line-2" />
    <span class="burger-btn-icon__line --line-3" />
  </div>
</button>

<style>
  .burger-btn {
    --size: 50px;
    --lineH: 2px;
    /** sizeから3本線の高さを引いて、上:2 | 間:1 | 間:1 | 下:2 の比率で空白を割り振る */
    --gap: calc((var(--size) - var(--lineH) * 3) / 6);
    --space-2x: calc(var(--size) * 0.45);
    --space-x: calc(var(--space-2x) / 2);
    --space-y: calc(var(--gap) * 2);
    --lineW: calc(var(--size) - var(--space-2x));

    /** reset */
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    appearance: none;
    border-radius: 10px;
  }

  .burger-btn-icon {
    width: var(--size);
    height: var(--size);
    background-color: #457703;
    padding: var(--space-y) var(--space-x);
    box-sizing: border-box;
    position: relative;
    border-radius: 10px;
  }

  .burger-btn-icon__line {
    --line-pos: calc(var(--space-y) + (var(--lineH) + var(--gap)) * var(--idx));
    position: absolute;
    top: var(--line-pos);
    left: var(--space-x);
    height: var(--lineH);
    border-radius: 5px;
    background: #fff;
    display: inline-block;
    width: var(--lineW);
    transition: all 0.4s;
  }

  .burger-btn-icon__line.--line-1 {
    --idx: 0;
  }

  .burger-btn-icon__line.--line-2 {
    --idx: 1;
  }

  .burger-btn-icon__line.--line-3 {
    --idx: 2;
  }

  .burger-btn[aria-expanded="true"] .burger-btn-icon__line.--line-1 {
    --idx: 1;
    transform: rotate(-45deg);
  }

  .burger-btn[aria-expanded="true"] .burger-btn-icon__line.--line-2 {
    opacity: 0;
  }

  .burger-btn[aria-expanded="true"] .burger-btn-icon__line.--line-3 {
    --idx: 1;
    transform: rotate(45deg);
  }
</style>
