import { getLastPartOfString, padWithLeadingZeros } from 'utils'
import type { BrowserType, ScraperObjType, SpriteObject } from '../../types'

const PIXEL_ICON_SPRITE_URL = 'https://pokemondb.net/sprites'
const PIXEL_ICON_MAIN_DOM_SELECTOR = '#main'
const PIXEL_ICON_IMG_DOM_SELECTOR = '#main img.icon-pkmn'
const PIXEL_ICON_FILE_PREFIX = 'pixel-icon-'

export const pixelIconsSpriteScraper: ScraperObjType = {
  url: PIXEL_ICON_SPRITE_URL,
  scraper: async (browser: BrowserType) => {
    const page = await browser?.newPage()

    console.log(`Navigating to page ${PIXEL_ICON_SPRITE_URL}`)

    await page?.goto(PIXEL_ICON_SPRITE_URL)

    // wait for the DOM part we need to be rendered
    await page?.waitForSelector(PIXEL_ICON_MAIN_DOM_SELECTOR)

    // get sprite urls
    const sprites: SpriteObject[] = (await page?.$$eval(
      PIXEL_ICON_IMG_DOM_SELECTOR,
      (imgElements: HTMLImageElement[]) =>
        imgElements.map((image, index) => ({
          filePath: '',
          url: image.src,
          index: index + 1,
        })),
    )) || [{ filePath: '', url: '', index: 0 }]

    if (sprites.find(({ index }) => index === 0)) {
      throw new Error('Failed to extract sprite URLs')
    }

    await page?.close()

    return sprites.map(({ url, index }) => ({
      url,
      index,
      filePath: `sprites/${padWithLeadingZeros(
        index,
      )}/${PIXEL_ICON_FILE_PREFIX}${padWithLeadingZeros(index)}.${getLastPartOfString(url, '.')}`,
    }))
  },
}
