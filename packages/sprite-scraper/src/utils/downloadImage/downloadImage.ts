import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'
import { mkdirp } from 'mkdirp'
import type { SpriteObject } from '../../types'

type DownloadImageSignature = (options: SpriteObject) => Promise<void>

export const downloadImage: DownloadImageSignature = async options => {
  const { url, filePath } = options

  try {
    await mkdirp(path.dirname(filePath)) // Create the outputPath

    const response = await axios.get(url, { responseType: 'stream' })

    if (response.status === 200) {
      const writer = fs.createWriteStream(filePath)
      response.data.pipe(writer)

      return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
      })
    }

    console.error(`Error downloading the image. HTTP Status: ${response.status}`)
  } catch (error) {
    console.error(`Error downloading the image: ${error.message}`)
  }
}
