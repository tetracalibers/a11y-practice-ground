<script lang="ts">
  import ColorPicker from "./color-picker.svelte"

  $: color = "#ECC5FB"
  const onChange = (newColor: string) => {
    color = newColor
  }
</script>

<div class="preview-container" style:--bg={color}>
  <ColorPicker {color} {onChange} />
</div>

<style>
  .preview-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: var(--bg);
  }
</style>
