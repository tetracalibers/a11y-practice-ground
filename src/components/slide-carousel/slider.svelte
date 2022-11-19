<script lang="ts">
  import { ComponentType, onMount } from "svelte"
  import { getCarouselContext } from "./index.svelte"
  import SlideItem from "./slide-item.svelte"

  /** スワイプ動作がパネルの20%を移動させたら遷移判定をする（閾値） */
  const SWIPE_THRESHOLD = 0.2

  export let slideId = ""
  export let indicatorId = ""
  export let datalist: Record<string, unknown>[]
  export let component: ComponentType
  const SlideItemInner = component

  let containerEl: HTMLDivElement
  let rootel: HTMLElement
  let imgWidth: number

  const { currIdx, itemCount, dir } = getCarouselContext()

  let swipeOffset: `${number}px` = "0px"
  let pointer = {
    startX: 0,
    moveX: 0,
    hold: false,
  }

  const slide = () => {
    if (containerEl) {
      containerEl.scroll({
        left: $currIdx * imgWidth,
      })
    }
  }

  /** currIdxが変化したらスライドアニメーション */
  currIdx.subscribe(idx => {
    slide()
  })

  const slideBySwipe = () => {
    /** 閾値を超えているかどうかの判定に使う */
    const absMoveX = Math.abs(pointer.moveX)
    const addIdx = pointer.moveX > 0 ? -1 : 1

    const isOverThreshold = absMoveX > imgWidth * SWIPE_THRESHOLD

    /** 遷移しない */
    if (!isOverThreshold) {
      return
    }

    /** 遷移する */
    let swipedIdx = $currIdx + addIdx
    if (swipedIdx > itemCount - 1) {
      swipedIdx = 0
    }
    if (swipedIdx < 0) {
      swipedIdx = itemCount - 1
    }
    dir.set(addIdx)
    currIdx.set(swipedIdx)
  }

  /** pointerdown時 */
  const onSwipeStart = (e: PointerEvent) => {
    if (!e.isPrimary) return
    e.preventDefault()
    pointer.startX = e.clientX
    pointer.hold = true
  }

  /** pointermove時 */
  const onSwiping = (e: PointerEvent) => {
    if (!e.isPrimary || !pointer.hold) return
    e.preventDefault()
    const moveX = e.clientX - pointer.startX
    pointer.moveX = moveX
    swipeOffset = `${moveX}px`
  }

  /** pointerup時 */
  const onSwipeEnd = (e: PointerEvent) => {
    if (!e.isPrimary || !pointer.hold) return
    e.preventDefault()
    /** スワイプ追従終了 */
    swipeOffset = "0px"
    /** 必要に応じてスライドを実行 */
    slideBySwipe()
    /** pointer情報をリセット */
    pointer.startX = 0
    pointer.moveX = 0
    pointer.hold = false
  }

  onMount(() => {
    rootel = document.documentElement

    imgWidth = window.innerWidth * 0.7
    const resizeObserver = new ResizeObserver(e => {
      imgWidth = window.innerWidth * 0.7
      slide()
    })
    resizeObserver.observe(rootel)

    return () => {
      resizeObserver.unobserve(rootel)
    }
  })
</script>

<div
  class="carousel-visible"
  bind:this={containerEl}
  on:pointerdown={onSwipeStart}
  on:pointermove={onSwiping}
  on:pointerup={onSwipeEnd}
  on:pointercancel={onSwipeEnd}
  style={[`--swipe-offset: ${swipeOffset}`, `--count: ${itemCount}`].join(";")}
>
  <div class="carousel-slide-list">
    <SlideItem idx={-1}>
      <SlideItemInner {...datalist[itemCount - 1]} />
    </SlideItem>
    {#each datalist as data, i}
      <SlideItem idx={i} id={slideId} {indicatorId}>
        <SlideItemInner {...data} />
      </SlideItem>
    {/each}
    <SlideItem idx={itemCount}>
      <SlideItemInner {...datalist[0]} />
    </SlideItem>
  </div>
</div>
<div class="visually-hidden" aria-live="polite" aria-atomic="true">
  {itemCount}件中、{$currIdx + 1}件目を表示しています
</div>

<style>
  /** 見える範囲 */
  .carousel-visible {
    --slide-width: 70vw;
    overflow-x: hidden;
    /** 2つ目のslotが表示されるように */
    margin-left: calc(-1 * var(--slide-width) * 0.8);
    /** スワイプとタッチ操作の衝突を回避 */
    touch-action: none;
    /** スワイプ追従 */
    transform: translateX(var(--swipe-offset));
    /** スワイプ追従時の見切れを解消 */
    margin-right: var(--swipe-offset);
  }

  /** スライドするアイテム全体 */
  .carousel-slide-list {
    display: flex;
    flex-wrap: nowrap;
    width: var(--slide-width);
  }
</style>
