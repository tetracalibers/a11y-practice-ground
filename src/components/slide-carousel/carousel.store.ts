import { Writable, writable } from "svelte/store"

export const currIdx = writable(0)
export const dir: Writable<1 | -1> = writable(1)
