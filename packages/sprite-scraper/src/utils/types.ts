import type { Browser } from 'puppeteer'

export type BrowserType = Browser | null
export type SpriteCollectionType = { url: string; filename: string }[]
export type ScraperObjType = {
  url: string
  scraper: (browser: BrowserType) => Promise<SpriteCollectionType | undefined>
}
