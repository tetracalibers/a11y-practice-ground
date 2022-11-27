<script lang="ts">
  import { getPointerPos } from "@/utility/media"
  import Move from "carbon-icons-svelte/lib/Move.svelte"

  let lastpos = { x: 0, y: 0 }
  let position = { x: 0, y: 0 }
  let startpos = { x: 0, y: 0 }
  let dragging = false

  const step = 10

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

  const onKeydown = (e: KeyboardEvent) => {
    const key = e.key
    switch (key) {
      case " ":
      case "Space":
        dragging = !dragging
        startpos.x = lastpos.x
        startpos.y = lastpos.y
        return
      case "Up":
      case "ArrowUp":
        if (!dragging) return
        position.y -= step
        lastpos.y = position.y
        return
      case "Down":
      case "ArrowDown":
        if (!dragging) return
        position.y += step
        lastpos.y = position.y
        return
      case "Left":
      case "ArrowLeft":
        if (!dragging) return
        position.x -= step
        lastpos.x = position.x
        return
      case "Right":
      case "ArrowRight":
        if (!dragging) return
        position.x += step
        lastpos.x = position.x
        return
      case "Esc":
      case "Escape":
        if (!dragging) return
        position.x = startpos.x
        position.y = startpos.y
        lastpos.x = startpos.x
        lastpos.y = startpos.y
        dragging = false
        return
      default:
        return
    }
  }
</script>

<div
  class="moveable"
  class:dragging
  style:--pos-x={position.x + "px"}
  style:--pos-y={position.y + "px"}
  on:mousedown={onDragStart}
  on:touchstart={onDragStart}
>
  <slot />
  <button type="button" class="moveable__move-button" on:keydown={onKeydown}>
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

  .moveable.dragging {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border: 2px dashed #94a3b8;
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
