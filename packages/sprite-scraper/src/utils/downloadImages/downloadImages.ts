import type { SpriteObject } from '../../types'
import { downloadImage } from '../downloadImage'

type DownloadImagesSignature = (imageOptionsArray: SpriteObject[]) => Promise<void>

export const downloadImages: DownloadImagesSignature = async imageOptionsArray => {
  const downloadPromises = imageOptionsArray.map(imageOptions => {
    return downloadImage(imageOptions).then(() => {
      console.log(`Image downloaded to ${imageOptions.filePath}`)
    })
  })

  try {
    await Promise.all(downloadPromises)
    console.log('Every Image download has succeeded.')
  } catch (error) {
    console.error('Error during the download of at least one image:', error)
  }
}
