import type { BrowserType } from './types'
import { pixelIconsSpriteScraper, pkmnHomeIconsSpriteScraper } from './scrapers'
import { downloadImages } from './utils/downloadImages'

type ScrapeAllSignature = (browserInstance: Promise<BrowserType>) => Promise<void>

const scrapeAll: ScrapeAllSignature = async browserInstance => {
  let browser: BrowserType = null

  try {
    browser = await browserInstance
    // pixel icon sprites
    // const pixelIcons = await pixelIconsSpriteScraper.scraper(browser)
    // await downloadImages(pixelIcons)

    // pokemon home icon Sprites
    const pkmnHomeIcons = await pkmnHomeIconsSpriteScraper.scraper(browser)
    console.log(pkmnHomeIcons)
  } catch (error) {
    console.log('Could not resolve the browser instance => ', error)
  }
}

export const scraperController: ScrapeAllSignature = browserInstance => scrapeAll(browserInstance)
