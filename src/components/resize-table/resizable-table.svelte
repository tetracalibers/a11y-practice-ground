<script lang="ts">
  import { clamp } from "@/utility/math"
  import { getPointerPos } from "@/utility/media"

  export let columns: string[]
  export let data: Record<typeof columns[number], string>[]

  const minColumnWidth = 150
  const step = 10

  let tableEl: HTMLTableElement
  let cols: HTMLElement[] = Array(columns.length)
  let draggingIdx: number = null

  $: columnWidths = cols.map(col => col?.offsetWidth)
  $: resizerHeight = tableEl?.offsetHeight ?? 0
  $: maxColumnWidth = tableEl
    ? Math.min(tableEl.offsetWidth, document.documentElement.clientWidth) -
      minColumnWidth * (columns.length - 1)
    : minColumnWidth

  const updateColumnStyle = () => {
    tableEl.style.gridTemplateColumns = columnWidths
      .map(w => w + "px")
      .join(" ")
  }

  const calcOverflow = () => {
    const totalWidth = columnWidths.reduce((prev, curr) => prev + curr, 0)
    const tableWidth = Math.min(
      tableEl.offsetWidth,
      document.documentElement.clientWidth,
    )
    const overflow = tableWidth - totalWidth
    return overflow
  }

  const resize = (resizedW: number) => {
    const newWidth = clamp(resizedW, minColumnWidth, maxColumnWidth)
    columnWidths[draggingIdx] = newWidth
    const overflow = calcOverflow()
    // resizeTarget以外のカラムで余白を分け合う
    const dx = overflow / (columns.length - 1)

    cols.forEach((_, i) => {
      if (i > draggingIdx) {
        columnWidths[i] = clamp(
          columnWidths[i] + dx,
          minColumnWidth,
          maxColumnWidth,
        )
      }
    })
    updateColumnStyle()
  }

  const resizeToMin = () => {
    columnWidths[draggingIdx] = minColumnWidth
    const overflow = calcOverflow()
    // resizeTargetより右側にあるカラムで余白を分け合う
    const dx = overflow / (columns.length - 1 - draggingIdx)
    cols.forEach((_, i) => {
      if (i > draggingIdx) {
        columnWidths[i] = clamp(
          columnWidths[i] + dx,
          minColumnWidth,
          maxColumnWidth,
        )
      }
    })
    updateColumnStyle()
  }

  const resizeToMax = () => {
    columnWidths[draggingIdx] = maxColumnWidth
    cols.forEach((_, i) => {
      if (i !== draggingIdx) {
        columnWidths[i] = minColumnWidth
      }
    })
    updateColumnStyle()
  }

  const onDragStart = (e: MouseEvent | TouchEvent, i: number) => {
    e.preventDefault()
    draggingIdx = i
    window.addEventListener("mousemove", onDrag, { passive: false })
    window.addEventListener("touchmove", onDrag, { passive: false })
    window.addEventListener("mouseup", onDragEnd)
    window.addEventListener("touchend", onDragEnd)
  }

  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (draggingIdx === null) return
    e.preventDefault()
    const { clientX } = getPointerPos(e)
    const resizedW = clientX - cols[draggingIdx].offsetLeft
    resize(resizedW)
  }

  const onDragEnd = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    draggingIdx = null
    window.removeEventListener("mousemove", onDrag)
    window.removeEventListener("touchmove", onDrag)
    window.removeEventListener("mouseup", onDragEnd)
    window.removeEventListener("touchend", onDragEnd)
  }

  const onKeydownResizer = (e: KeyboardEvent, i: number) => {
    const key = e.key
    draggingIdx = i
    switch (key) {
      case "Right":
      case "ArrowRight":
        resize(cols[i].offsetWidth + step)
        break
      case "Left":
      case "ArrowLeft":
        resize(cols[i].offsetWidth - step)
        break
      case "Home":
        resizeToMin()
        break
      case "End":
        resizeToMax()
        break
      default:
        return
    }
    draggingIdx = null
    e.preventDefault()
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<table bind:this={tableEl}>
  <thead>
    <tr>
      {#each columns as column, i}
        <th bind:this={cols[i]} id={`id-ResizableTable-header__column--${i}`}>
          <div>{column}</div>
          {#if i < columns.length - 1}
            <hr
              class="resize-handle"
              style:--height={resizerHeight + "px"}
              tabindex="0"
              aria-orientation="vertical"
              aria-valuenow={columnWidths[i]}
              aria-valuemin={minColumnWidth}
              aria-valuemax={maxColumnWidth}
              aria-label={`${column}列の幅変更コントロール`}
              aria-controls={`id-ResizableTable-header__column--${i} id-ResizableTable-data__column--${i}`}
              on:mousedown={e => onDragStart(e, i)}
              on:touchstart={e => onDragStart(e, i)}
              on:keydown={e => onKeydownResizer(e, i)}
            />
          {/if}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row}
      <tr>
        {#each columns as column, i}
          <td id={`id-ResizableTable-data__column--${i}`}
            ><div>{row[column]}</div></td
          >
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    display: grid;
    overflow: hidden;
    grid-template-columns:
      minmax(150px, 1fr)
      minmax(150px, 1fr)
      minmax(150px, 1fr);
    border: 2px solid #ccc;
  }

  table thead,
  table tbody,
  table tr {
    display: contents;
  }

  table th {
    position: relative;
    font-size: 18px;
  }

  table th,
  table td {
    text-align: left;
    padding: 16px 20px;
    min-width: 100px;
  }

  table th div,
  table td div {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }

  table tr td {
    border-top: 1px solid #ccc;
  }

  .resize-handle {
    display: block;
    position: absolute;
    cursor: col-resize;
    width: 7px;
    height: var(--height);
    right: 0;
    top: 0;
    border-right: 1px solid #ccc;
  }

  .resize-handle:hover,
  .resize-handle:focus,
  .resize-handle:active {
    border-width: 2px;
    border-color: #517ea5;
    outline: none;
  }
</style>
