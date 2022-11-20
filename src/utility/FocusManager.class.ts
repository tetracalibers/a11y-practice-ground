export class FocusManager {
  private elements: HTMLElement[]
  private eventTargetCondition: (el: HTMLElement) => boolean

  constructor(
    elements: HTMLElement[],
    eventTargetCondition: (el: HTMLElement) => boolean,
  ) {
    this.elements = elements
    this.eventTargetCondition = eventTargetCondition
  }

  setFocusNext = (el: HTMLElement) => {
    const idx = this.elements.indexOf(el)
    if (idx === -1) return
    if (idx === this.elements.length - 1) {
      this.elements[0]?.focus()
      return
    }
    this.elements[idx + 1]?.focus()
  }

  setFocusPrev = (el: HTMLElement) => {
    const idx = this.elements.indexOf(el)
    if (idx === -1) return
    if (idx === 0) {
      this.elements[this.elements.length - 1]?.focus()
      return
    }
    this.elements[idx - 1]?.focus()
  }

  setFocusFirst = () => {
    this.elements[0]?.focus()
  }

  setFocusLast = () => {
    this.elements[this.elements.length - 1]?.focus()
  }

  onKeyDown = (e: KeyboardEvent) => {
    const el = e.target as HTMLElement
    const key = e.key
    if (!this.eventTargetCondition(el)) return

    switch (key) {
      case "Down":
      case "ArrowDown":
        this.setFocusNext(el)
        break
      case "Up":
      case "ArrowUp":
        this.setFocusPrev(el)
        break
      case "Home":
        this.setFocusFirst()
        break
      case "End":
        this.setFocusLast()
        break
      default:
        return
    }

    e.stopPropagation()
    e.preventDefault()
  }
}
