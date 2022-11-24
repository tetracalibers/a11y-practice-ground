import { parse, HTMLElement } from "node-html-parser"

interface Menuitem {
  el: HTMLElement
  depth: number
  root: HTMLElement
  parent: HTMLElement
}

export class DropdownNavHtmlConverter {
  menuitems: {
    els: HTMLElement[]
    details: Menuitem[]
  }
  menubarItems: HTMLElement[]
  menus: HTMLElement[][]
  html: string

  constructor(html: string) {
    const menubar = parse(html)
    const els = menubar.querySelectorAll('[role="menuitem"]')
    this.menubarItems = menubar.querySelectorAll(
      '[role="menubar"] > li > [role="menuitem"]',
    )
    this.menus = this.groupingMenuitem(els)

    const details = this.menus.flatMap((menuitems, i) => {
      const root = this.menus[i][0]
      let depth = 0
      let parent = root
      return menuitems.map(menuitem => {
        let result = { el: menuitem, depth, root, parent }
        if (this.isExpandable(menuitem)) {
          result.depth = depth++
          parent = menuitem
        }
        return result
      })
    })

    this.menuitems = { els, details }

    // 最初のmenubarItemのみfocus可能に
    els.forEach((el, i) => {
      const tabindex = i === 0 ? "0" : "-1"
      el.setAttribute("tabindex", tabindex)
    })
    // 深さを計測し、セット
    this.setupDepth()

    this.html = menubar.toString()
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

  isExpandable = (el: HTMLElement) => {
    return el.hasAttribute("aria-expanded")
  }
}
