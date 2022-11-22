export const getChildrenArray = (parent: HTMLElement, selector: string) => {
  const nodelist: NodeListOf<HTMLElement> = parent.querySelectorAll(selector)
  return Array.from(nodelist)
}

export const getParentEl = (el: HTMLElement) => {
  return el.parentElement
}

export const getPrevEl = (el: HTMLElement) => {
  return el.previousElementSibling as HTMLElement
}

export const getFirstChildEl = (el: HTMLElement) => {
  return el.firstElementChild as HTMLElement
}
