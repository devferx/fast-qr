import { getImageDataFromFile } from './image-utils'

export const getImageFromClipboardAsBlob = (pasteEvent: ClipboardEvent) => {
  var items = pasteEvent.clipboardData?.items
  if (!items) return null

  for (let idx = 0; idx < items.length; idx++) {
    // Skip content if not image
    if (items[idx].type.indexOf('image') == -1) continue

    const blob = items[idx].getAsFile()
    return blob
  }

  return null
}

export const getImageFromClipboardAsImageData = async (
  pasteEvent: ClipboardEvent,
): Promise<ImageData | null> => {
  const image = getImageFromClipboardAsBlob(pasteEvent)
  if (!image) return null

  const imageData = await getImageDataFromFile(image)
  return imageData
}
