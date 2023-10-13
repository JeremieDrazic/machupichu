import { pixelIconsSpriteScraper } from './scrapers/pixelIconsSpriteScraper'
import type { BrowserType } from './utils/types'

type ScrapeAllSignature = (browserInstance: Promise<BrowserType>) => Promise<void>

const scrapeAll: ScrapeAllSignature = async browserInstance => {
  let browser: BrowserType = null

  try {
    browser = await browserInstance
    const pixelIcons = await pixelIconsSpriteScraper.scraper(browser)
    console.log(pixelIcons, pixelIcons?.length)
  } catch (error) {
    console.log('Could not resolve the browser instance => ', error)
  }
}

export const scraperController: ScrapeAllSignature = browserInstance => scrapeAll(browserInstance)
