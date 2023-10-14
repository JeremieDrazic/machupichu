import type { Browser } from 'puppeteer'

export type BrowserType = Browser | null
export type SpriteObject = {
  url: string
  index: number
  filePath: string
}
export type ScraperObjType = {
  url: string
  scraper: (browser: BrowserType) => Promise<SpriteObject[]>
}
