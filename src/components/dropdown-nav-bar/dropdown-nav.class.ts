import {
  getChildrenArray,
  getFirstChildEl,
  getLastChildEl,
  getParentEl,
  getPrevEl,
} from "@/utility/dom"

export class DropdownNav {
  private menuitems: HTMLElement[]
  private menubarItems: HTMLElement[]

  constructor(menubarEl: HTMLElement) {
    this.menuitems = getChildrenArray(menubarEl, '[role="menuitem"]')
    this.menubarItems = getChildrenArray(
      menubarEl,
      ':scope > li > [role="menuitem"]',
    )
  }

  isMenuitemHasSubmenu = (menuitem: HTMLElement) => {
    return menuitem.getAttribute("aria-haspopup") === "true"
  }

  isRoot = (el: HTMLElement) => {
    return el.getAttribute("role") === "menubar"
  }

  isSubmenuRoot = (el: HTMLElement) => {
    return el.getAttribute("role") === "menu"
  }

  isMenuitem = (el: HTMLElement) => {
    return el.getAttribute("role") === "menuitem"
  }

  isMenubarItem = (el: HTMLElement) => {
    const owner = this.getCurrentMenu(el)
    return this.isRoot(owner)
  }

  isInSubmenu = (menuitem: HTMLElement) => {
    const parent = this.getImmediateParentMenuitem(menuitem)
    // 親がmenubar全体のrootなら、自分はsubmenu内ではない直下node
    if (!parent || this.isRoot(parent)) {
      return false
    }
    // 親であるmenuitemがsubmenuを持つなら、自分はそこに属する
    if (this.isMenuitemHasSubmenu(parent)) {
      return true
    }
    // まだtreeのrootにもsubtreeのrootにも達していなければ、さらに親を調べる
    this.isInSubmenu(parent)
  }

  isExpandable = (el: HTMLElement) => {
    return el.hasAttribute("aria-expanded")
  }

  isExpanded = (el: HTMLElement) => {
    return el.getAttribute("aria-expanded") === "true"
  }

  expand = (expandable: HTMLElement) => {
    expandable.setAttribute("aria-expanded", "true")
  }

  collapse = (expanded: HTMLElement) => {
    expanded.setAttribute("aria-expanded", "false")
  }

  collapseAll = () => {
    this.menuitems.forEach(el => {
      if (this.isExpandable(el)) this.collapse(el)
    })
  }

  isVisible = (menuitem: HTMLElement) => {
    if (this.isInSubmenu(menuitem)) {
      const parent = this.getImmediateParentMenuitem(menuitem)
      return parent && this.isExpanded(parent)
    }
    return true
  }

  getVisibleMenuitems = () => {
    return this.menuitems.filter(item => this.isVisible(item))
  }

  getPrevVisible = (menuitem: HTMLElement) => {
    const visibles = this.getVisibleMenuitems()
    const idx = visibles.indexOf(menuitem)
    if (idx === -1) return
    const prevIdx = idx === 0 ? visibles.length - 1 : idx - 1
    return visibles[prevIdx]
  }

  // ul > li > menuitemという構成で、ulを取得
  getCurrentMenu = (menuitem: HTMLElement) => {
    const li = getParentEl(menuitem)
    const ul = getParentEl(li)
    return ul
  }

  getRootMenuitem = (menuitem: HTMLElement) => {
    const parent = this.getImmediateParentMenuitem(menuitem)
    if (!parent) return menuitem
    return this.getRootMenuitem(parent)
  }

  // 直近の親となるmenuitem
  getImmediateParentMenuitem = (menuitem: HTMLElement) => {
    const ul = this.getCurrentMenu(menuitem)
    // ul[role="menubar"]なら、親となるmenuitemは存在しない
    if (this.isRoot(ul)) {
      return false
    }
    // ul[role="menu"]なら、その前のrole="menuitem"が直近
    if (this.isSubmenuRoot(ul)) {
      const prevEl = getPrevEl(ul)
      return this.isMenuitemHasSubmenu(prevEl) ? prevEl : false
    }
    this.getImmediateParentMenuitem(ul)
  }

  getCurrentMenuFirst = (menuitem: HTMLElement) => {
    // ul
    const currentMenu = this.getCurrentMenu(menuitem)
    // li[role="presentation"]
    const firstMenuitemWrapper = getFirstChildEl(currentMenu)
    // [role="menuitem"]
    return getFirstChildEl(firstMenuitemWrapper)
  }

  getCurrentMenuLast = (menuitem: HTMLElement) => {
    // ul
    const currentMenu = this.getCurrentMenu(menuitem)
    // li[role="presentation"]
    const lastMenuitemWrapper = getLastChildEl(currentMenu)
    // [role="menuitem"]
    return getFirstChildEl(lastMenuitemWrapper)
  }

  setFocusTo = (el: HTMLElement) => {
    el?.focus()
    return el
  }

  setFocusToNext = (collection: HTMLElement[], el: HTMLElement) => {
    const idx = collection.indexOf(el)
    if (idx === -1) return
    let nextIdx = idx + 1
    if (idx === collection.length - 1) nextIdx = 0
    return this.setFocusTo(collection[nextIdx])
  }

  setFocusToNextMenuitemOf = (menuitem: HTMLElement) => {
    return this.setFocusToNext(this.menuitems, menuitem)
  }

  setFocusToNextMenubarItemOf = (menubarItem: HTMLElement) => {
    return this.setFocusToNext(this.menubarItems, menubarItem)
  }

  setFocusToPrev = (collection: HTMLElement[], el: HTMLElement) => {
    const idx = collection.indexOf(el)
    if (idx === -1) return
    const prevIdx = idx === 0 ? collection.length - 1 : idx - 1
    return this.setFocusTo(collection[prevIdx])
  }

  setFocusToPrevMenuitemOf = (menuitem: HTMLElement) => {
    return this.setFocusToPrev(this.menuitems, menuitem)
  }

  setFocusToPrevMenubarItemOf = (menubarItem: HTMLElement) => {
    return this.setFocusToPrev(this.menubarItems, menubarItem)
  }

  openSubmenuFocusFirst = (expandableMenuitem: HTMLElement) => {
    this.expand(expandableMenuitem)
    this.setFocusToNextMenuitemOf(expandableMenuitem)
  }

  activateMenuitem = (menuitem: HTMLElement) => {
    menuitem.click()
    this.collapseAll()
  }

  cleanupEvent = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  onKeydownEnter = (target: HTMLElement) => {
    if (!this.isMenuitem(target)) return false
    this.isExpandable(target)
      ? this.openSubmenuFocusFirst(target)
      : this.activateMenuitem(target)
    return true
  }

  onKeydownArrowDown = (target: HTMLElement) => {
    if (!this.isMenuitem(target)) return false
    this.isExpandable(target)
      ? this.openSubmenuFocusFirst(target)
      : this.setFocusToNextMenuitemOf(target)
    return true
  }

  onKeydownArrowUp = (target: HTMLElement) => {
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
    if (!this.isMenuitem(target)) return false
    const focusTarget = this.getCurrentMenuFirst(target)
    if (!focusTarget) return false
    this.setFocusTo(focusTarget)
    return true
  }

  onKeydownEnd = (target: HTMLElement) => {
    if (!this.isMenuitem(target)) return false
    const focusTarget = this.getCurrentMenuLast(target)
    if (!focusTarget) return false
    this.setFocusTo(focusTarget)
    return true
  }

  onKeydown = (e: KeyboardEvent) => {
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
        this.onKeydownHome(target) && this.cleanupEvent(e)
        return
      case "End":
        this.onKeydownEnd(target) && this.cleanupEvent(e)
        return
      default:
        return
    }
  }
}
