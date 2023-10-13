import { launch } from 'puppeteer'
import type { BrowserType } from './utils/types'

export const startBrowser = async (): Promise<BrowserType> => {
  let browser: BrowserType = null

  try {
    console.log('Opening the browser...')

    browser = await launch({
      headless: false,
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
    })
  } catch (error) {
    console.log('Could not create a browser instance => : ', error)
  }

  return browser
}
