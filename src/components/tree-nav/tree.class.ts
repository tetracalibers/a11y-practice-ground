import { getChildrenArray, getParentEl, getPrevEl } from "@/utility/dom"

const firstCharMatching = (char: string) => {
  char = char.toLowerCase()
  return (str: string) => {
    return str.trim()[0].toLowerCase() === char
  }
}

const isPrintableChar = (str: string) => {
  return str.length === 1 && str.match(/\S/)
}

export class Tree {
  private treeitems: HTMLElement[]

  constructor(treeEl: HTMLElement) {
    this.treeitems = getChildrenArray(treeEl, '[role="treeitem"]')
    // 最初のtreeitemのみfocus可能に
    this.treeitems[0].setAttribute("tabindex", "0")
  }

  isTreeitemWithSubtree = (treeitem: HTMLElement) => {
    return treeitem.hasAttribute("aria-owns")
  }

  isTreeRoot = (treeitem: HTMLElement) => {
    return treeitem.getAttribute("role") === "tree"
  }

  isSubtreeGroupRoot = (treeitem: HTMLElement) => {
    return treeitem.getAttribute("role") === "group"
  }

  isInSubtree = (treeitem: HTMLElement) => {
    const parent = this.getImmediateParentTreeitem(treeitem)
    // 親がtree全体のrootなら、自分はsubtree内ではない直下node
    if (!parent || this.isTreeRoot(parent)) {
      return false
    }
    // 親がsubtreeのrootなら、自分はそこに属する
    if (parent.hasAttribute("aria-owns")) {
      return true
    }
    // まだtreeのrootにもsubtreeのrootにも達していなければ、さらに親を調べる
    this.isInSubtree(parent)
  }

  isExpandable = (treeitem: HTMLElement) => {
    return treeitem.hasAttribute("aria-expanded")
  }

  isExpanded = (treeitem: HTMLElement) => {
    return treeitem.getAttribute("aria-expanded") === "true"
  }

  getSubtreeGroup = (treeitem: HTMLElement) => {
    const ownsId = treeitem.getAttribute("aria-owns")
    return ownsId ? document.getElementById(ownsId) : undefined
  }

  // ul > li > treeitemという構成で、ulを取得
  getImmediateRoot = (treeitem: HTMLElement) => {
    const li = getParentEl(treeitem)
    const ul = getParentEl(li)
    return ul
  }

  // 直近の親となるtreeitem
  getImmediateParentTreeitem = (treeitem: HTMLElement) => {
    const ul = this.getImmediateRoot(treeitem)
    // ul[role="tree"]なら、親となるtreeitemは存在しない
    if (this.isTreeRoot(ul)) {
      return false
    }
    // ul[role="group"]なら、その前のrole="treeitem"が直近
    if (this.isSubtreeGroupRoot(ul)) {
      const prevEl = getPrevEl(ul)
      return this.isTreeitemWithSubtree(prevEl) ? prevEl : false
    }
    this.getImmediateParentTreeitem(ul)
  }

  isExistSubtreeGroup = (treeitem: HTMLElement) => {
    const hasGroup = this.isTreeitemWithSubtree(treeitem)
    if (!hasGroup) return
    const group = this.getSubtreeGroup(treeitem)
    return !!group
  }

  expandTreeitem = (treeitem: HTMLElement) => {
    if (this.isExistSubtreeGroup(treeitem)) {
      treeitem.setAttribute("aria-expanded", "true")
    }
  }

  collapseTreeitem = (treeitem: HTMLElement) => {
    if (this.isExistSubtreeGroup(treeitem)) {
      treeitem.setAttribute("aria-expanded", "false")
    }
  }

  expandAllSiblingTreeitems = (treeitem: HTMLElement) => {
    const ul = this.getImmediateRoot(treeitem)
    if (!ul) return
    const siblings = ul.querySelectorAll(":scope > li > [role='treeitem']")
    siblings.forEach(node => node.setAttribute("aria-expanded", "true"))
  }

  isVisible = (treeitem: HTMLElement) => {
    if (this.isInSubtree(treeitem)) {
      const parent = this.getImmediateParentTreeitem(treeitem)
      return parent && parent.getAttribute("aria-expanded") === "true"
    }
    return true
  }

  getVisibleTreeitems = () => {
    return this.treeitems.filter(item => this.isVisible(item))
  }

  getNextVisible = (treeitem: HTMLElement) => {
    const visibles = this.getVisibleTreeitems()
    const currIdx = visibles.indexOf(treeitem)
    if (currIdx === -1) return undefined
    return visibles[currIdx + 1]
  }

  getPrevVisible = (treeitem: HTMLElement) => {
    const visibles = this.getVisibleTreeitems()
    const currIdx = visibles.indexOf(treeitem)
    if (currIdx === -1) return undefined
    return visibles[currIdx - 1]
  }

  setFocusToTreeitem = (treeitem: HTMLElement) => {
    treeitem?.focus()
  }

  setFocusToFirstTreeitem = () => {
    this.setFocusToTreeitem(this.treeitems[0])
  }

  setFocusToLastTreeitem = () => {
    const visibles = this.getVisibleTreeitems()
    if (visibles.length === 0) return
    const last = visibles[visibles.length - 1]
    this.setFocusToTreeitem(last)
  }

  setFocusToNextTreeitem = (treeitem: HTMLElement) => {
    const next = this.getNextVisible(treeitem)
    if (!next) return
    this.setFocusToTreeitem(next)
  }

  setFocusToPrevTreeitem = (treeitem: HTMLElement) => {
    const prev = this.getPrevVisible(treeitem)
    if (!prev) return
    this.setFocusToTreeitem(prev)
  }

  setFocusToParentTreeitem = (treeitem: HTMLElement) => {
    const parent = this.getImmediateParentTreeitem(treeitem)
    if (!parent) return
    this.setFocusToTreeitem(parent)
  }

  setFocusByFirstCharacter = (treeitem: HTMLElement, char: string) => {
    const visibles = this.getVisibleTreeitems()
    const match = firstCharMatching(char)
    let matched: HTMLElement
    // 指定されたtreeitemより後のtreeitemが検索対象
    let startIdx = visibles.indexOf(treeitem) + 1
    // 次のtreeitemがidx範囲を超えるようであれば、検索対象は最初から
    if (startIdx > visibles.length) {
      startIdx = 0
    }
    // startIdx以降を探す
    let searchTargets = visibles.slice(startIdx)
    for (const el of searchTargets) {
      if (match(el.textContent)) {
        matched = el
        this.setFocusToTreeitem(matched)
        return
      }
    }
    // まだ見つかっていなければ、前半も探す
    if (startIdx !== 0) {
      searchTargets = visibles.slice(0, startIdx)
      for (const el of searchTargets) {
        if (match(el.textContent)) {
          matched = el
          this.setFocusToTreeitem(matched)
          return
        }
      }
    }
  }

  onClickTreeitem = (e: MouseEvent | TouchEvent) => {
    const el = e.target as HTMLElement
    // treeitemで発火したイベントでなければ無視
    if (el.getAttribute("role") !== "treeitem") return
    // 開けないtreeitemをクリックした場合、何もせずデフォルト挙動に任せる
    if (!this.isExpandable(el)) return

    // 閉じているなら開く、開いているなら閉じる
    this.isExpanded(el) ? this.collapseTreeitem(el) : this.expandTreeitem(el)
    // ここでイベント消化（伝播させない）
    e.stopPropagation()
    // デフォルトアクション停止
    e.preventDefault()
  }

  onKeydownTreeitem = (e: KeyboardEvent) => {
    const el = e.target as HTMLElement
    const key = e.key
    if (el.getAttribute("role") !== "treeitem") return

    switch (key) {
      case "*":
        this.expandAllSiblingTreeitems(el)
        break
      case "Up":
      case "ArrowUp":
        this.setFocusToPrevTreeitem(el)
        break
      case "Down":
      case "ArrowDown":
        this.setFocusToNextTreeitem(el)
        break
      case "Right":
      case "ArrowRight":
        this.isExpanded(el)
          ? this.setFocusToNextTreeitem(el)
          : this.expandTreeitem(el)
        break
      case "Left":
      case "ArrowLeft":
        this.isExpanded(el)
          ? this.collapseTreeitem(el)
          : this.isInSubtree(el) && this.setFocusToParentTreeitem(el)
        break
      case "Home":
        this.setFocusToFirstTreeitem()
        break
      case "End":
        this.setFocusToLastTreeitem()
        break
      default:
        isPrintableChar(key) && this.setFocusByFirstCharacter(el, key)
        return
    }

    e.stopPropagation()
    e.preventDefault()
  }
}
