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

export const getImageFromClipboardAsImageData = (
  pasteEvent: ClipboardEvent,
): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const image = getImageFromClipboardAsBlob(pasteEvent)
    if (!image) return null

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    const URLObj = window.URL || window.webkitURL
    const img = new Image()

    img.onload = function () {
      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)

      const imageData = ctx?.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ) as ImageData

      resolve(imageData)
    }

    img.onerror = function (error) {
      reject(error)
    }

    img.src = URLObj.createObjectURL(image)
  })
}
