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
export type EmptyScraperOptionsType = {
  prefix: string
  nbPkmns: number
  getSpriteUrl: (nb: number) => string
}
export type EmptyScraperObjType = {
  scraper: (options: EmptyScraperOptionsType) => SpriteObject[]
}
