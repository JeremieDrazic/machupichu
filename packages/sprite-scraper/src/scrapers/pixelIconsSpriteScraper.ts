import type { BrowserType, ScraperObjType, SpriteCollectionType } from '../utils/types'

export const PIXEL_ICON_SPRITE_URL = 'https://pokemondb.net/sprites'
export const PIXEL_ICON_MAIN_DOM_SELECTOR = '#main'
export const PIXEL_ICON_IMG_DOM_SELECTOR = '#main img.icon-pkmn'

export const pixelIconsSpriteScraper: ScraperObjType = {
  url: PIXEL_ICON_SPRITE_URL,
  scraper: async (browser: BrowserType) => {
    const page = await browser?.newPage()

    console.log(`Navigating to page ${PIXEL_ICON_SPRITE_URL}`)

    await page?.goto(PIXEL_ICON_SPRITE_URL)

    // wait for the DOM part we need to be rendered
    await page?.waitForSelector(PIXEL_ICON_MAIN_DOM_SELECTOR)

    // get sprite urls
    const sprites: SpriteCollectionType | undefined = await page?.$$eval(
      PIXEL_ICON_IMG_DOM_SELECTOR,
      (imgElements: HTMLImageElement[]) => {
        return imgElements.map(image => ({ url: image.src, filename: '' }))
      },
    )

    await browser?.close()

    return sprites
  },
}
