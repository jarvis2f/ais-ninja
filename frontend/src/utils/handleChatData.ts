export function handleChatData(text: string) {
  const data = text
    .split('\n\n')
    .filter((item) => item !== undefined && item !== null && item.trim() !== '')
    .map((d) => {
      try {
        return JSON.parse(d)
      } catch (e) {
        return {}
      }
    })
  return data
}
