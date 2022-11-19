<script lang="ts">
  import BurgerButton from "./burger-button.svelte"
  import { onMount } from "svelte"

  type BackdropAnimationType =
    | "from-top"
    | "from-bottom"
    | "from-left"
    | "from-right"
    | "fade"
    | "circle-from-top"
    | "circle-from-bottom"
    | "circle-from-left"
    | "circle-from-right"
    | "circle-from-right-top"
    | "circle-from-right-bottom"
    | "circle-from-left-top"
    | "circle-from-left-bottom"
    | "circle-from-center"

  export let bgAnimeType: BackdropAnimationType = "circle-from-left-top"

  let rootel: HTMLElement
  let bodyel: HTMLElement
  let transitionWrapEl: HTMLDivElement
  let navel: HTMLElement
  let buttonel: HTMLButtonElement
  let focusables: NodeListOf<HTMLElement>
  let firstFocusable: HTMLElement
  let lastFocusable: HTMLElement
  let scrollbarW: number

  // ドロワーが開いているか
  let opened = false
  // 閉じたあとに開くボタンにフォーカスを戻すか
  let focusOpenButtonAfterClose = true

  // 背景スクロールの禁止切り替え
  const scrollLockModifier = "scroll-lock"
  const activeScrollLock = () => {
    rootel.classList.add(scrollLockModifier)
    bodyel.classList.add(scrollLockModifier)
  }
  const deactiveScrollLock = () => {
    rootel.classList.remove(scrollLockModifier)
    bodyel.classList.remove(scrollLockModifier)
  }

  // 開閉
  const openDrawer = () => {
    // ドロワーを開くときにフォーカスを戻すようリセット
    focusOpenButtonAfterClose = true
    opened = true
  }
  const closeDrawer = () => {
    opened = false
  }

  // 開閉ボタンクリック
  const onClickOpenButton = () => {
    activeScrollLock()
    openDrawer()
    firstFocusable.focus()
  }
  const onClickCloseButton = () => {
    closeDrawer()
  }

  // Shift+Tabキー押下時、それが最初のTabキー操作可能な要素の場合は、最後の要素にフォーカスが移動する
  const onTabKeydownFirstFocusable = (e: KeyboardEvent) => {
    if (e.key !== "Tab" || !e.shiftKey) return
    e.preventDefault()
    lastFocusable.focus()
  }

  // Tabキー押下時、それが最後のTabキー操作可能な要素の場合は、最初の要素にフォーカスが移動する
  const onTabKeydownLastFocusable = (e: KeyboardEvent) => {
    if (e.key !== "Tab" || e.shiftKey) return
    e.preventDefault()
    firstFocusable.focus()
  }

  // Escキーでドロワーを閉じる
  const onEscKeydown = (e: KeyboardEvent) => {
    if (!opened || e.key !== "Escape") return
    e.preventDefault()
    closeDrawer()
  }

  // リンククリックでドロワーを閉じる
  const onClickAnchorLink = (e: MouseEvent | TouchEvent) => {
    const target = e.target as HTMLElement
    if (target.tagName !== "A") return
    // 開くボタンにフォーカスを戻さずにclose
    focusOpenButtonAfterClose = false
    closeDrawer()
  }

  onMount(() => {
    rootel = document.documentElement
    bodyel = document.body

    /** 背景スクロールの禁止 */
    const onTransitionDrawer = (e: TransitionEvent) => {
      if (e.target === transitionWrapEl || e.propertyName === "visibility")
        return
      if (!opened) {
        deactiveScrollLock()
        focusOpenButtonAfterClose && buttonel.focus()
      }
    }
    transitionWrapEl.addEventListener(
      "transitionend",
      onTransitionDrawer,
      false,
    )

    /** スクロールバーの幅取得 */
    const resizeObserver = new ResizeObserver(e => {
      if (opened) return
      scrollbarW = window.innerWidth - rootel.clientWidth
      rootel.style.setProperty("--scrollbar-w", scrollbarW + "px")
    })
    resizeObserver.observe(rootel)

    /** フォーカス可能な要素の取得 */
    focusables = navel.querySelectorAll("a[href], button:not(:disabled)")
    firstFocusable = focusables[0]
    lastFocusable = focusables[focusables.length - 1]

    /** フォーカスの閉じ込め */
    firstFocusable.addEventListener(
      "keydown",
      onTabKeydownFirstFocusable,
      false,
    )
    lastFocusable.addEventListener("keydown", onTabKeydownLastFocusable, false)

    /** Escキーでドロワーを閉じる */
    window.addEventListener("keydown", onEscKeydown, false)

    /** リンククリックでドロワーを閉じる */
    navel.addEventListener("click", onClickAnchorLink, false)

    return () => {
      transitionWrapEl.removeEventListener(
        "transitionend",
        onTransitionDrawer,
        false,
      )
      firstFocusable.removeEventListener(
        "keydown",
        onTabKeydownFirstFocusable,
        false,
      )
      lastFocusable.removeEventListener(
        "keydown",
        onTabKeydownLastFocusable,
        false,
      )
      window.removeEventListener("keydown", onEscKeydown, false)
      navel.removeEventListener("click", onClickAnchorLink, false)
      resizeObserver.unobserve(rootel)
    }
  })
</script>

<div class="trigger-button fix-scrollbar-gutter">
  <BurgerButton
    {opened}
    on:click={opened ? onClickCloseButton : onClickOpenButton}
    bind:el={buttonel}
    navid="drawer"
  />
</div>
<div bind:this={transitionWrapEl}>
  <div class="drawer fix-scrollbar-gutter" id="drawer" aria-expanded={opened}>
    <nav bind:this={navel} class="drawer-nav nav remove-scrollbar-margin">
      <slot />
    </nav>
  </div>
  <div class={["drawer-backdrop", `--${bgAnimeType}`].join(" ")} />
</div>

<style>
  :global(html) {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  :global(body) {
    margin: 0;
  }

  :global(.scroll-lock) {
    overflow: hidden;
  }

  :global(html.scroll-lock .fix-scrollbar-gutter) {
    margin-right: var(--scrollbar-w);
  }

  :global(html.scroll-lock .remove-scrollbar-margin) {
    margin-right: calc(-1 * var(--scrollbar-w));
  }

  .trigger-button {
    position: fixed;
    z-index: 9999; /*ボタンを最前面に*/
    top: 10px;
    left: 10px;
  }

  .drawer {
    position: fixed;
    top: 0;
    z-index: 9998;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .drawer-backdrop {
    position: absolute;
    z-index: 9997;
    background-color: #457703;
  }

  .nav {
    overflow: auto;
  }

  /** 開閉アニメーション */
  .drawer[aria-expanded] {
    transition-property: visibility, opacity;
  }
  .drawer[aria-expanded] ~ .drawer-backdrop {
    transition-duration: 0.6s;
  }

  .drawer[aria-expanded="true"] {
    transition-duration: 1s;
    transition-delay: 0.2s;
    visibility: visible;
    opacity: 1;
  }
  .drawer[aria-expanded="false"] {
    transition-duration: 0s;
    transition-delay: 0s;
    visibility: hidden;
    opacity: 0;
  }

  /** 長方形が広がる, fade（共通） */
  .drawer[aria-expanded] ~ .drawer-backdrop[class*="--from"],
  .drawer[aria-expanded] ~ .drawer-backdrop.--fade {
    width: 100%;
    height: 100vh;
  }

  /** 上から広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--from-top {
    transition-property: top;
    left: 0;
  }
  .drawer[aria-expanded="true"] ~ .drawer-backdrop.--from-top {
    top: 0;
  }
  .drawer[aria-expanded="false"] ~ .drawer-backdrop.--from-top {
    top: -120%;
  }

  /** 下から広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--from-bottom {
    transition-property: bottom;
    left: 0;
  }
  .drawer[aria-expanded="true"] ~ .drawer-backdrop.--from-bottom {
    bottom: 0;
  }
  .drawer[aria-expanded="false"] ~ .drawer-backdrop.--from-bottom {
    bottom: -120%;
  }

  /** 左から広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--from-left {
    transition-property: left;
    top: 0;
  }
  .drawer[aria-expanded="true"] ~ .drawer-backdrop.--from-left {
    left: 0;
  }
  .drawer[aria-expanded="false"] ~ .drawer-backdrop.--from-left {
    left: -120%;
  }

  /** 右から広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--from-right {
    transition-property: right;
    top: 0;
  }
  .drawer[aria-expanded="true"] ~ .drawer-backdrop.--from-right {
    right: 0;
  }
  .drawer[aria-expanded="false"] ~ .drawer-backdrop.--from-right {
    right: -120%;
  }

  /** fade */
  .drawer[aria-expanded] ~ .drawer-backdrop.--fade {
    transition-property: opacity;
  }
  .drawer[aria-expanded="true"] ~ .drawer-backdrop.--fade {
    opacity: 1;
  }
  .drawer[aria-expanded="false"] ~ .drawer-backdrop.--fade {
    opacity: 0;
  }

  /** 円が広がる（共通） */
  .drawer[aria-expanded] ~ .drawer-backdrop[class*="--circle"] {
    --circle-size: 100px;
    --circle-half-size-negative: -50px;
    transition-property: transform;
    width: var(--circle-size);
    height: var(--circle-size);
    border-radius: 50%;
  }
  .drawer[aria-expanded="true"] ~ .drawer-backdrop[class*="--circle"] {
    transform: scale(50);
  }
  .drawer[aria-expanded="false"] ~ .drawer-backdrop[class*="--circle"] {
    transform: scale(0);
  }

  /** 上から円が広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--circle-from-top {
    top: var(--circle-half-size-negative);
    left: calc(50% + var(--circle-half-size-negative));
  }

  /** 下から円が広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--circle-from-bottom {
    bottom: var(--circle-half-size-negative);
    left: calc(50% + var(--circle-half-size-negative));
  }

  /** 右から円が広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--circle-from-right {
    right: var(--circle-half-size-negative);
    top: calc(50% + var(--circle-half-size-negative));
  }

  /** 左から円が広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--circle-from-left {
    left: var(--circle-half-size-negative);
    top: calc(50% + var(--circle-half-size-negative));
  }

  /** 右上から円が広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--circle-from-right-top {
    right: var(--circle-half-size-negative);
    top: var(--circle-half-size-negative);
  }

  /** 右下から円が広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--circle-from-right-bottom {
    right: var(--circle-half-size-negative);
    bottom: var(--circle-half-size-negative);
  }

  /** 左上から円が広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--circle-from-left-top {
    left: var(--circle-half-size-negative);
    top: var(--circle-half-size-negative);
  }

  /** 左下から円が広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--circle-from-left-bottom {
    left: var(--circle-half-size-negative);
    bottom: var(--circle-half-size-negative);
  }

  /** 中央から円が広がる */
  .drawer[aria-expanded] ~ .drawer-backdrop.--circle-from-center {
    left: calc(50% + var(--circle-half-size-negative));
    top: calc(50% + var(--circle-half-size-negative));
  }
</style>
