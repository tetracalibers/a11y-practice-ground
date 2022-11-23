import { isPrintableChar } from "./../../utility/str"
import {
  getChildrenArray,
  getFirstChildEl,
  getLastChildEl,
  getPrevEl,
} from "@/utility/dom"
import { firstCharMatching } from "@/utility/str"
import { debugCallFn } from "@/utility/debug"

interface Menuitem {
  el: HTMLElement
  depth: number
  root: HTMLElement
  parent: HTMLElement
}

export class DropdownNav {
  private menuitems: {
    els: HTMLElement[]
    details: Menuitem[]
  }
  private menubarItems: HTMLElement[]
  private menus: HTMLElement[][]

  constructor(menubarEl: HTMLElement) {
    const els = getChildrenArray(menubarEl, '[role="menuitem"]')
    this.menubarItems = getChildrenArray(
      menubarEl,
      ':scope > li > [role="menuitem"]',
    )
    this.menus = this.groupingMenuitem(els)

    const details = this.menus.flatMap((menuitems, i) => {
      const root = this.menus[i][0]
      let depth = 0
      let parent = root
      return menuitems.map(menuitem => {
        let result = { el: menuitem, depth, root, parent }
        if (this.isExpandable(menuitem)) {
          result.depth = ++depth
          parent = menuitem
        }
        return result
      })
    })

    this.menuitems = { els, details }

    // 最初のmenubarItemのみfocus可能に
    this.menubarItems[0].setAttribute("tabindex", "0")
    // 深さを計測し、セット
    this.setupDepth()
  }

  // 属するmenubarItemごとに分ける
  groupingMenuitem = (menuitems: HTMLElement[]) => {
    const rootIdxs = this.menubarItems.map(baritem => {
      return menuitems.indexOf(baritem)
    })
    return rootIdxs.map((idx, i) => {
      return i === rootIdxs.length - 1
        ? menuitems.slice(idx)
        : menuitems.slice(idx, rootIdxs[i + 1])
    })
  }

  setupDepth = () => {
    this.menuitems.details.forEach(({ el, depth }) => {
      if (depth > 0) {
        el.setAttribute("data-depth", depth.toString())
      }
    })
  }

  isRoot = (el: HTMLElement) => {
    debugCallFn("isRoot")
    return el.getAttribute("role") === "menubar"
  }

  isMenuitem = (el: HTMLElement) => {
    debugCallFn("isMenuitem")
    return el.getAttribute("role") === "menuitem"
  }

  isMenubarItem = (el: HTMLElement) => {
    debugCallFn("isMenubarItem")
    const owner = this.getCurrentMenu(el)
    return this.isRoot(owner)
  }

  isExpandable = (el: HTMLElement) => {
    debugCallFn("isExpandable")
    return el.hasAttribute("aria-expanded")
  }

  isExpanded = (el: HTMLElement) => {
    debugCallFn("isExpanded")
    return el.getAttribute("aria-expanded") === "true"
  }

  expand = (expandable: HTMLElement) => {
    debugCallFn("expand")
    expandable.setAttribute("aria-expanded", "true")
  }

  collapse = (expanded: HTMLElement) => {
    debugCallFn("collapse")
    expanded.setAttribute("aria-expanded", "false")
  }

  collapseAll = () => {
    debugCallFn("collapseAll")
    this.menuitems.els.forEach(el => {
      if (this.isExpandable(el)) this.collapse(el)
    })
  }

  isVisible = (menuitem: HTMLElement) => {
    debugCallFn("isVisible")
    const idx = this.menuitems.els.indexOf(menuitem)
    if (idx === -1) return false
    const { parent } = this.menuitems.details[idx]
    return this.isExpanded(parent)
  }

  getVisibleMenuitems = () => {
    debugCallFn("getVisibleMenuitems")
    return this.menuitems.els.filter(el => this.isVisible(el))
  }

  getPrevVisible = (menuitem: HTMLElement) => {
    debugCallFn("getPrevVisible")
    const visibles = this.getVisibleMenuitems()
    const idx = visibles.indexOf(menuitem)
    if (idx === -1) return
    const prevIdx = idx === 0 ? visibles.length - 1 : idx - 1
    return visibles[prevIdx]
  }

  // ul > li > menuitemという構成で、ulを取得
  getCurrentMenu = (menuitem: HTMLElement) => {
    debugCallFn("getCurrentMenu")
    const idx = this.menuitems.els.indexOf(menuitem)
    if (idx === -1) return null
    const { parent } = this.menuitems.details[idx]
    return parent
  }

  getRootMenuitem = (menuitem: HTMLElement) => {
    debugCallFn("getRootMenuitem")
    const idx = this.menuitems.els.indexOf(menuitem)
    if (idx === -1) return null
    const { root } = this.menuitems.details[idx]
    return root
  }

  直近の親となるmenuitem
  getImmediateParentMenuitem = (menuitem: HTMLElement) => {
    debugCallFn("getImmediateParentMenuitem")
    const idx = this.menuitems.els.indexOf(menuitem)
    if (idx === -1) return null
    const { parent } = this.menuitems.details[idx]
    if (!parent) return null
    return getPrevEl(parent)
  }

  getCurrentMenuFirst = (menuitem: HTMLElement) => {
    debugCallFn("getCurrentMenuFirst")
    // ul
    const currentMenu = this.getCurrentMenu(menuitem)
    // li[role="presentation"]
    const firstMenuitemWrapper = getFirstChildEl(currentMenu)
    // [role="menuitem"]
    return getFirstChildEl(firstMenuitemWrapper)
  }

  getCurrentMenuLast = (menuitem: HTMLElement) => {
    debugCallFn("getCurrentMenuLast")
    // ul
    const currentMenu = this.getCurrentMenu(menuitem)
    // li[role="presentation"]
    const lastMenuitemWrapper = getLastChildEl(currentMenu)
    // [role="menuitem"]
    return getFirstChildEl(lastMenuitemWrapper)
  }

  setFocusTo = (el: HTMLElement) => {
    debugCallFn("setFocusTo")
    el?.focus()
    return el
  }

  setFocusToNext = (collection: HTMLElement[], el: HTMLElement) => {
    debugCallFn("setFocusToNext")
    const idx = collection.indexOf(el)
    if (idx === -1) return
    let nextIdx = idx + 1
    if (idx === collection.length - 1) nextIdx = 0
    return this.setFocusTo(collection[nextIdx])
  }

  setFocusToNextMenuitemOf = (menuitem: HTMLElement) => {
    debugCallFn("setFocusToNextMenuitemOf")
    return this.setFocusToNext(this.menuitems.els, menuitem)
  }

  setFocusToNextMenubarItemOf = (menubarItem: HTMLElement) => {
    debugCallFn("setFocusToNextMenubarItemOf")
    return this.setFocusToNext(this.menubarItems, menubarItem)
  }

  setFocusToPrev = (collection: HTMLElement[], el: HTMLElement) => {
    debugCallFn("setFocusToPrev")
    const idx = collection.indexOf(el)
    if (idx === -1) return
    const prevIdx = idx === 0 ? collection.length - 1 : idx - 1
    return this.setFocusTo(collection[prevIdx])
  }

  setFocusToPrevMenuitemOf = (menuitem: HTMLElement) => {
    debugCallFn("setFocusToPrevMenuitemOf")
    return this.setFocusToPrev(this.menuitems.els, menuitem)
  }

  setFocusToPrevMenubarItemOf = (menubarItem: HTMLElement) => {
    debugCallFn("setFocusToPrevMenubarItemOf")
    return this.setFocusToPrev(this.menubarItems, menubarItem)
  }

  setFocusByFirstCharacter = (menuitem: HTMLElement, char: string) => {
    debugCallFn("setFocusByFirstCharacter")
    const visibles = this.getVisibleMenuitems()
    const match = firstCharMatching(char)
    let matched: HTMLElement
    // 指定されたmenuitemより後のmenuitemが検索対象
    let startIdx = visibles.indexOf(menuitem) + 1
    // 次のmenuitemがidx範囲を超えるようであれば、検索対象は最初から
    if (startIdx > visibles.length) {
      startIdx = 0
    }
    // startIdx以降を探す
    let searchTargets = visibles.slice(startIdx)
    for (const el of searchTargets) {
      if (match(el.textContent)) {
        matched = el
        this.setFocusTo(matched)
        return
      }
    }
    // まだ見つかっていなければ、前半も探す
    if (startIdx !== 0) {
      searchTargets = visibles.slice(0, startIdx)
      for (const el of searchTargets) {
        if (match(el.textContent)) {
          matched = el
          this.setFocusTo(matched)
          return
        }
      }
    }
  }

  openSubmenuFocusFirst = (expandableMenuitem: HTMLElement) => {
    debugCallFn("openSubmenuFocusFirst")
    this.expand(expandableMenuitem)
    this.setFocusToNextMenuitemOf(expandableMenuitem)
  }

  activateMenuitem = (menuitem: HTMLElement) => {
    debugCallFn("activateMenuitem")
    menuitem.click()
    this.collapseAll()
  }

  cleanupEvent = (e: Event) => {
    debugCallFn("cleanupEvent")
    e.preventDefault()
    e.stopPropagation()
  }

  onKeydownEnter = (target: HTMLElement) => {
    debugCallFn("onKeydownEnter")
    if (!this.isMenuitem(target)) return false
    this.isExpandable(target)
      ? this.openSubmenuFocusFirst(target)
      : this.activateMenuitem(target)
    return true
  }

  onKeydownArrowDown = (target: HTMLElement) => {
    debugCallFn("onKeydownArrowDown")
    if (!this.isMenuitem(target)) return false
    this.isExpandable(target)
      ? this.openSubmenuFocusFirst(target)
      : this.setFocusToNextMenuitemOf(target)
    return true
  }

  onKeydownArrowUp = (target: HTMLElement) => {
    debugCallFn("onKeydownArrowUp")
    if (!this.isMenuitem(target)) return false
    const prev = this.getPrevVisible(target)
    if (this.isExpandable(prev) && !this.isExpanded(prev)) {
      this.expand(prev)
      this.setFocusToPrevMenuitemOf(target)
      return true
    }
    this.setFocusTo(prev)
    return true
  }

  onKeydownArrowRight = (target: HTMLElement) => {
    debugCallFn("onKeydownArrowRight")
    if (this.isMenubarItem(target)) {
      this.setFocusToNextMenubarItemOf(target)
      return true
    }
    if (this.isExpandable(target)) {
      this.openSubmenuFocusFirst(target)
      return true
    }
    this.collapseAll()
    const root = this.getRootMenuitem(target)
    const next = this.setFocusToNextMenubarItemOf(root)
    this.isExpandable(next) && this.expand(next)
    return true
  }

  onKeydownArrowLeft = (target: HTMLElement) => {
    debugCallFn("onKeydownArrowLeft")
    if (this.isMenubarItem(target)) {
      this.setFocusToPrevMenubarItemOf(target)
      return true
    }
    const parent = this.getImmediateParentMenuitem(target)
    if (!parent) return false
    if (this.isMenubarItem(parent)) {
      this.collapseAll()
      const root = this.getRootMenuitem(target)
      const prev = this.setFocusToPrevMenubarItemOf(root)
      this.isExpandable(prev) && this.expand(prev)
      return true
    }
    this.collapse(parent)
    this.setFocusTo(parent)
    return true
  }

  onKeydownHome = (target: HTMLElement) => {
    debugCallFn("onKeydownHome")
    if (!this.isMenuitem(target)) return false
    const focusTarget = this.getCurrentMenuFirst(target)
    if (!focusTarget) return false
    this.setFocusTo(focusTarget)
    return true
  }

  onKeydownEnd = (target: HTMLElement) => {
    debugCallFn("onKeydownEnd")
    if (!this.isMenuitem(target)) return false
    const focusTarget = this.getCurrentMenuLast(target)
    if (!focusTarget) return false
    this.setFocusTo(focusTarget)
    return true
  }

  onKeydownEscape = (target: HTMLElement) => {
    debugCallFn("onKeydownEscape")
    if (!this.isMenuitem(target)) return false
    const parent = this.getImmediateParentMenuitem(target)
    if (!parent || !this.isExpanded(parent)) return false
    this.collapse(parent)
    this.setFocusTo(parent)
    return true
  }

  onKeydownPrintableChar = (target: HTMLElement, char: string) => {
    debugCallFn("onKeydownPrintableChar")
    if (!this.isMenuitem(target)) return false
    this.setFocusByFirstCharacter(target, char)
    return true
  }

  onKeydown = (e: KeyboardEvent) => {
    debugCallFn("onKeydown")
    const target = e.target as HTMLElement
    const key = e.key

    switch (key) {
      case " ":
      case "Enter":
        this.onKeydownEnter(target) && this.cleanupEvent(e)
        return
      case "Down":
      case "ArrowDown":
        this.onKeydownArrowDown(target) && this.cleanupEvent(e)
        return
      case "Up":
      case "ArrowUp":
        this.onKeydownArrowUp(target) && this.cleanupEvent(e)
        return
      case "Right":
      case "ArrowRight":
        this.onKeydownArrowRight(target) && this.cleanupEvent(e)
        return
      case "Left":
      case "ArrowLeft":
        this.onKeydownArrowLeft(target) && this.cleanupEvent(e)
        return
      case "Home":
      case "PageUp":
        this.onKeydownHome(target) && this.cleanupEvent(e)
        return
      case "End":
      case "PageDown":
        this.onKeydownEnd(target) && this.cleanupEvent(e)
        return
      case "Esc":
      case "Escape":
        this.onKeydownEscape(target) && this.cleanupEvent(e)
        return
      default:
        isPrintableChar(key) &&
          this.onKeydownPrintableChar(target, key) &&
          this.cleanupEvent(e)
        return
    }
  }
}
