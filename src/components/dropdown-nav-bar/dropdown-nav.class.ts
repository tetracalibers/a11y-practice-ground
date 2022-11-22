import { getChildrenArray, getParentEl, getPrevEl } from "@/utility/dom"

export class DropdownNav {
  private menuitems: HTMLElement[]

  constructor(menubarEl: HTMLElement) {
    this.menuitems = getChildrenArray(menubarEl, '[role="menuitem"]')
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
  getImmediateRoot = (menuitem: HTMLElement) => {
    const li = getParentEl(menuitem)
    const ul = getParentEl(li)
    return ul
  }

  // 直近の親となるmenuitem
  getImmediateParentMenuitem = (menuitem: HTMLElement) => {
    const ul = this.getImmediateRoot(menuitem)
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

  setFocusTo = (el: HTMLElement) => {
    el?.focus()
  }

  setFocusToNextOf = (menuitem: HTMLElement) => {
    const idx = this.menuitems.indexOf(menuitem)
    if (idx === -1) return
    let nextIdx = idx + 1
    if (idx === this.menuitems.length - 1) nextIdx = 0
    this.setFocusTo(this.menuitems[nextIdx])
  }

  setFocusToPrevOf = (menuitem: HTMLElement) => {
    const idx = this.menuitems.indexOf(menuitem)
    if (idx === -1) return
    const prevIdx = idx === 0 ? this.menuitems.length - 1 : idx - 1
    this.setFocusTo(this.menuitems[prevIdx])
  }

  openSubmenuFocusFirst = (expandableMenuitem: HTMLElement) => {
    this.expand(expandableMenuitem)
    this.setFocusToNextOf(expandableMenuitem)
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
      : this.setFocusToNextOf(target)
    return true
  }

  onKeydownArrowUp = (target: HTMLElement) => {
    if (!this.isMenuitem(target)) return false
    const prev = this.getPrevVisible(target)
    if (this.isExpandable(prev) && !this.isExpanded(prev)) {
      this.expand(prev)
      this.setFocusToPrevOf(target)
      return true
    }
    this.setFocusTo(prev)
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
      default:
        return
    }
  }
}
