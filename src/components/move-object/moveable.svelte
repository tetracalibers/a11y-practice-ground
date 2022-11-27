<script lang="ts">
  import { getPointerPos } from "@/utility/media"
  import Move from "carbon-icons-svelte/lib/Move.svelte"

  let lastpos = { x: 0, y: 0 }
  let position = { x: 0, y: 0 }
  let dragging = false

  const onDragStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    dragging = true
    const { clientX, clientY } = getPointerPos(e)
    // スタート位置記録
    lastpos.x = clientX
    lastpos.y = clientY
    // 要素ではなく、document に対してハンドラをアタッチすることで、
    // ブラウザの外にカーソルがでても動作を維持できる。
    document.addEventListener("mousemove", onDragMove, { passive: false })
    // touchmoveに対してe.preventDefault()を併用する際には、passive: falseを明示的に宣言する必要がある
    document.addEventListener("touchmove", onDragMove, { passive: false })
    document.addEventListener("mouseup", onDragEnd)
    document.addEventListener("touchend", onDragEnd)
  }

  const onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!dragging) return
    e.preventDefault()
    const { clientX, clientY } = getPointerPos(e)
    // 移動量
    const deltaX = clientX - lastpos.x
    const deltaY = clientY - lastpos.y
    // 移動
    position.x += deltaX
    position.y += deltaY
    // 最新位置の記録
    lastpos.x = clientX
    lastpos.y = clientY
  }

  const onDragEnd = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    dragging = false
    // ドラッグ操作完了時にイベントを剥がす
    document.removeEventListener("mousemove", onDragMove)
    document.removeEventListener("touchmove", onDragMove)
    document.removeEventListener("mouseup", onDragEnd)
    document.removeEventListener("touchend", onDragEnd)
  }
</script>

<div
  class="moveable"
  style:--pos-x={position.x + "px"}
  style:--pos-y={position.y + "px"}
  on:mousedown={onDragStart}
  on:touchstart={onDragStart}
>
  <slot />
  <button type="button" class="moveable__move-button">
    <div class="visually-hidden">
      Element grabbed. Current position: Row 3, Column 2. Use the arrow keys to
      change position of the top left corner on canvas, Spacebar to drop, Escape
      key to cancel.
    </div>
    <Move />
  </button>
</div>

<style>
  .moveable {
    position: relative;
    transform: translate(var(--pos-x), var(--pos-y));
    width: fit-content;
  }

  .moveable :global(*) {
    cursor: move;
  }

  .moveable__move-button {
    appearance: none;
    background-color: transparent;
    position: absolute;
    left: 50%;
    bottom: 5px;
    transform: translateX(-50%);
    border-radius: 50%;
  }
</style>
