export const firstCharMatching = (char: string) => {
  char = char.toLowerCase()
  return (str: string) => {
    return str.trim()[0].toLowerCase() === char
  }
}

export const isPrintableChar = (str: string) => {
  return str.length === 1 && str.match(/\S/)
}
