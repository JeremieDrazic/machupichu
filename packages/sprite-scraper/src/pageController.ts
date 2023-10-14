import type { BrowserType } from './types'
import { pixelIconsSpriteScraper } from './scrapers/pixelIconsSpriteScraper'
import { downloadImages } from './utils/downloadImages'

type ScrapeAllSignature = (browserInstance: Promise<BrowserType>) => Promise<void>

const scrapeAll: ScrapeAllSignature = async browserInstance => {
  let browser: BrowserType = null

  try {
    browser = await browserInstance
    const pixelIcons = await pixelIconsSpriteScraper.scraper(browser)
    await downloadImages(pixelIcons)
  } catch (error) {
    console.log('Could not resolve the browser instance => ', error)
  }
}

export const scraperController: ScrapeAllSignature = browserInstance => scrapeAll(browserInstance)
