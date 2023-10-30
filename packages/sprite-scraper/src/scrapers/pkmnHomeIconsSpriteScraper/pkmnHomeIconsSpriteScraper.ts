import type { Page } from 'puppeteer'
import { getNationalNbFromString } from 'utils'
import type { BrowserType, ScraperObjType } from '../../types'

const PKMN_HOME_ICONS_DOMAIN = 'https://archives.bulbagarden.net'
const PKMN_HOME_ICONS_SPRITE_URL_PAGE_1 = `${PKMN_HOME_ICONS_DOMAIN}/w/index.php?title=Category:HOME_menu_sprites&fileuntil=Menu+HOME+0145.png#mw-category-media`
const PKMN_HOME_ICONS_MAIN_DOM_SELECTOR = '#mw-category-media'
const PKMN_HOME_ICONS_NEXT_PAGE_DOM_SELECTOR =
  '#mw-category-media a[title="Category:HOME menu sprites"]'
const PKMN_HOME_ICONS_SPRITE_IMG_DOM_SELECTOR = 'a.image img'
const TOTAL_PAGE_COUNT = 7
const PKMN_HOME_ICON_FILE_PREFIX = 'pkmn-home-icon-'

type CreatePageSignature = (browser: BrowserType, url: string) => Promise<Page | undefined>
const createPage: CreatePageSignature = async (browser, url) => {
  try {
    const page = await browser?.newPage()
    console.log(`Navigating to page: ${url}`)
    await page?.goto(url)

    return page
  } catch (error) {
    console.error(`Failed to create page for URL: ${url}`)
    return undefined
  }
}

type GetSpriteUrlsSignature = (
  page: Page | undefined,
  currentPage: number,
  nextPageUrl: string,
  spriteUrls: (string | null | undefined)[],
  mainDOMSelector: string,
  nextPageDOMSelector: string,
) => Promise<(string | null | undefined)[]>
const getSpriteUrls: GetSpriteUrlsSignature = async (
  page,
  currentPage,
  nextPageUrl,
  spriteUrls,
  mainDOMSelector,
  nextPageDOMSelector,
) => {
  if (page === undefined || currentPage > TOTAL_PAGE_COUNT) return spriteUrls

  try {
    let nextPage = currentPage
    let pageSpriteUrls: (string | null | undefined)[] = spriteUrls

    // Navigate to the page containing the sprites
    console.log(`Navigating to page: ${nextPageUrl}`)
    await page.goto(nextPageUrl)

    // Wait for the DOM section containing sprites to load
    const spritesContainer = await page.waitForSelector(mainDOMSelector)

    // Get source URLs of sprites
    const spriteSourceUrls: (string | null)[] =
      (await spritesContainer?.$$eval(
        PKMN_HOME_ICONS_SPRITE_IMG_DOM_SELECTOR,
        (imgElements: HTMLImageElement[]) =>
          imgElements.map(imgElement => imgElement.getAttribute('src')),
      )) || []

    // Filter out null source URLs
    pageSpriteUrls = [...pageSpriteUrls, ...spriteSourceUrls.filter(src => src !== null)]

    // Get the URL of the next page
    const nextUrlFromLinkElements: string | null | undefined = await spritesContainer?.$$eval(
      nextPageDOMSelector,
      (elements: HTMLAnchorElement[]) => {
        const nextPageLink = elements.find(
          element => element.tagName === 'A' && element.textContent === 'next page',
        )
        return nextPageLink ? nextPageLink.getAttribute('href') : null
      },
    )

    // Update the current page
    nextPage++

    // Recursively call the function with the next URL
    const nextUrl = `${PKMN_HOME_ICONS_DOMAIN}${nextUrlFromLinkElements}`

    return getSpriteUrls(
      page,
      nextPage,
      nextUrl,
      pageSpriteUrls,
      mainDOMSelector,
      nextPageDOMSelector,
    )
  } catch (error) {
    console.error(`An error occurred while navigating: ${error}`)
    return spriteUrls
  }
}

export const pkmnHomeIconsSpriteScraper: ScraperObjType = {
  url: PKMN_HOME_ICONS_SPRITE_URL_PAGE_1,
  scraper: async (browser: BrowserType) => {
    const firstPage = await createPage(browser, PKMN_HOME_ICONS_SPRITE_URL_PAGE_1)

    if (!firstPage) {
      console.error('Failed to create the first page.')
      return []
    }

    const spriteUrls = await getSpriteUrls(
      firstPage,
      1,
      PKMN_HOME_ICONS_SPRITE_URL_PAGE_1,
      [],
      PKMN_HOME_ICONS_MAIN_DOM_SELECTOR,
      PKMN_HOME_ICONS_NEXT_PAGE_DOM_SELECTOR,
    )

    return spriteUrls.map((url, index) => {
      if (!url)
        return {
          url: '',
          index,
          filePath: '',
        }

      const nationalNb = getNationalNbFromString(url || '0000')
      const urlParts = url.split('-')
      const lastUrlPart = urlParts[urlParts.length - 1]
      const fileName = lastUrlPart.includes('Menu_HOME_')
        ? `${PKMN_HOME_ICON_FILE_PREFIX}${nationalNb}.png`
        : `${PKMN_HOME_ICON_FILE_PREFIX}${nationalNb}-${lastUrlPart}`

      return {
        url,
        index,
        filePath: `sprites/${nationalNb}/${fileName}`,
      }
    })
  },
}
