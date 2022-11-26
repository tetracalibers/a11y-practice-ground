<script lang="ts">
  import { Color } from "./utility/Color.type"

  export let parsedColor: Color
  export let onChange: (e: Event) => void
</script>

<label for="id-ColorPicker__input--opacity">Opacity</label>
<input
  type="range"
  id="id-ColorPicker__input--opacity"
  value={parsedColor.hsva.a}
  on:input={onChange}
  min="0"
  max="100"
  step="1"
/>
