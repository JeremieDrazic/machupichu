import type { SpriteObject } from '../../types'
import { downloadImage } from '../downloadImage'

type DownloadImagesSignature = (imageOptionsArray: SpriteObject[]) => Promise<void>

export const downloadImages: DownloadImagesSignature = async imageOptionsArray => {
  const downloadNextImage = async (index: number): Promise<void> => {
    if (index < imageOptionsArray.length) {
      const imageOptions = imageOptionsArray[index]

      try {
        await downloadImage(imageOptions)
        console.log(`Image downloaded to ${imageOptions.filePath}`)
      } catch (error) {
        console.error('Error during the download of an image:', error)
      }

      // eslint-disable-next-line no-promise-executor-return -- I don't know what's going on
      await new Promise(resolve => setTimeout(resolve, 500))

      // Téléchargez l'image suivante
      await downloadNextImage(index + 1)
    } else {
      console.log('Every Image download has succeeded.')
    }
  }

  // Commencez le téléchargement à partir de l'index 0
  await downloadNextImage(0)
}
