import type { BrowserType } from './types'
import {
  pokeAPISpriteScraper,
  pixelIconsSpriteScraper,
  pkmnHomeIconsSpriteScraper,
  pkmnHomeSpriteOptions,
  pkmnHomeLargeSpriteOptions,
  frontSpritesOptions,
  officialSpritesOptions,
} from './scrapers'
import { downloadImages } from './utils/downloadImages'

type ScrapeAllSignature = (browserInstance: Promise<BrowserType>) => Promise<void>

const scrapeAll: ScrapeAllSignature = async browserInstance => {
  let browser: BrowserType = null

  try {
    browser = await browserInstance
    // pixel icon sprites
    const pixelIcons = await pixelIconsSpriteScraper.scraper(browser)
    await downloadImages(pixelIcons)

    // pokemon home icon sprites
    const pkmnHomeIcons = await pkmnHomeIconsSpriteScraper.scraper(browser)
    await downloadImages(pkmnHomeIcons)

    // pokemon home sprites
    const pkmnHomeSprites = await pokeAPISpriteScraper.scraper(pkmnHomeSpriteOptions)
    await downloadImages(pkmnHomeSprites)

    // pokemon home large sprites
    const pkmnHomeLargeSprites = await pokeAPISpriteScraper.scraper(pkmnHomeLargeSpriteOptions)
    await downloadImages(pkmnHomeLargeSprites)

    // pixel front sprites
    const pixelFrontSprites = await pokeAPISpriteScraper.scraper(frontSpritesOptions)
    await downloadImages(pixelFrontSprites)

    // pixel front sprites
    const officialSprites = await pokeAPISpriteScraper.scraper(officialSpritesOptions)
    await downloadImages(officialSprites)
  } catch (error) {
    console.log('Could not resolve the browser instance => ', error)
  }
}

export const scraperController: ScrapeAllSignature = browserInstance => scrapeAll(browserInstance)
