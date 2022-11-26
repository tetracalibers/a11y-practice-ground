<script lang="ts">
  import HueSlider from "./hue-slider.svelte"
  import OpacitySlider from "./opacity-slider.svelte"
  import SaturationDragPlane from "./saturation-drag-plane.svelte"
  import { hsvaToRgba, rgbaToHex } from "./utility/converters"
  import { parseColor } from "./utility/parser"

  export let color: string = "#ffffff"
  export let onChange: (color: string) => void = () => {}

  let parsedColor = parseColor(color)

  const onColorChange = (color: string) => {
    parsedColor = parseColor(color)
    onChange(color)
  }

  const onHexChange = (e: Event) => {
    const input = e.target as HTMLInputElement
    let color: string = input.value
    if (!color.startsWith("#")) color = "#" + color
    onColorChange(color)
  }

  const onRgbaChange = (e: Event, changed: "r" | "g" | "b" | "a") => {
    const input = e.target as HTMLInputElement
    const value = Number(input.value)
    const { r, g, b, a } = parsedColor.rgba
    switch (changed) {
      case "r":
        onColorChange(rgbaToHex({ r: value ?? 0, g, b, a }))
        return
      case "g":
        onColorChange(rgbaToHex({ r, g: value ?? 0, b, a }))
        return
      case "b":
        onColorChange(rgbaToHex({ r, g, b: value ?? 0, a }))
        return
      case "a":
        onColorChange(rgbaToHex({ r, g, b, a: value ?? 100 }))
        return
      default:
        return
    }
  }

  const onSaturationChange = (s: number, v: number) => {
    const rgba = hsvaToRgba({ ...parsedColor.hsva, s, v })
    onColorChange(rgbaToHex(rgba))
  }

  const onHueChange = (h: number) => {
    const hsva = { ...parsedColor.hsva, h }
    const rgba = hsvaToRgba(hsva)
    onColorChange(rgbaToHex(rgba))
  }

  const onOpacityChange = (a: number) => {
    const rgba = { ...parsedColor.rgba, a }
    onColorChange(rgbaToHex(rgba))
  }
</script>

<SaturationDragPlane color={parsedColor} setValueFn={onSaturationChange} />
<HueSlider color={parsedColor} setValueFn={onHueChange} />
<OpacitySlider color={parsedColor} setValueFn={onOpacityChange} />

<label for="id-ColorPicker__input--hex">Hex</label>
<input
  type="text"
  id="id-ColorPicker__input--hex"
  placeholder="hex"
  value={parsedColor.hex}
  on:input={onHexChange}
/>

<label for="id-ColorPicker__input--rgba-r">R</label>
<input
  type="text"
  id="id-ColorPicker__input--rgba-r"
  placeholder="R"
  value={parsedColor.rgba.r}
  on:input={e => onRgbaChange(e, "r")}
  inputmode="numeric"
  pattern="[0-9]*"
/>

<label for="id-ColorPicker__input--rgba-g">G</label>
<input
  type="text"
  id="id-ColorPicker__input--rgba-g"
  placeholder="G"
  value={parsedColor.rgba.g}
  on:input={e => onRgbaChange(e, "g")}
  inputmode="numeric"
  pattern="[0-9]*"
/>

<label for="id-ColorPicker__input--rgba-b">B</label>
<input
  type="text"
  id="id-ColorPicker__input--rgba-b"
  placeholder="B"
  value={parsedColor.rgba.b}
  on:input={e => onRgbaChange(e, "b")}
  inputmode="numeric"
  pattern="[0-9]*"
/>

<label for="id-ColorPicker__input--rgba-a">A(%)</label>
<input
  type="text"
  id="id-ColorPicker__input--rgba-a"
  placeholder="A"
  value={parsedColor.rgba.a}
  on:input={e => onRgbaChange(e, "a")}
  inputmode="numeric"
  pattern="[0-9]*"
/>
