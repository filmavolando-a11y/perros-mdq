// Achica la foto en el navegador antes de subirla
export async function shrink(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file)
  const s = Math.min(1, 1280 / Math.max(bmp.width, bmp.height))
  const c = document.createElement('canvas')
  c.width = Math.round(bmp.width * s)
  c.height = Math.round(bmp.height * s)
  c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height)
  return new Promise((res) => c.toBlob((b) => res(b!), 'image/jpeg', 0.8))
}
