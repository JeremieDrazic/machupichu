import type { Page } from 'puppeteer'
import { getNationalNbFromString } from 'utils'
import type { BrowserType, ScraperObjType } from '../../types'

const PKMN_HOME_ICONS_DOMAIN = 'https://archives.bulbagarden.net'
const PKMN_HOME_ICONS_SPRITE_URL_PAGE_1 = `${PKMN_HOME_ICONS_DOMAIN}/w/index.php?title=Category:HOME_menu_sprites&fileuntil=Menu+HOME+0145.png#mw-category-media`
const PKMN_HOME_ICONS_MAIN_DOM_SELECTOR = '#mw-category-media'
const PKMN_HOME_ICONS_NEXT_PAGE_DOM_SELECTOR =
  '#mw-category-media a[title="Category:HOME menu sprites"]'
const PKMN_HOME_ICONS_SPRITE_IMG_DOM_SELECTOR = 'a.image img'

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
  nextPageUrl: string,
  spriteUrls: (string | null)[],
  mainDOMSelector: string,
  nextPageDOMSelector: string,
  domainUrl: string,
) => Promise<(string | null)[]>
const getSpriteUrls: GetSpriteUrlsSignature = async (
  page,
  nextPageUrl,
  spriteUrls,
  mainDOMSelector,
  nextPageDOMSelector,
  domainUrl,
) => {
  if (page === undefined || !nextPageUrl) return spriteUrls

  try {
    let pageSpriteUrls: (string | null)[] = spriteUrls

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

    // Recursively call the function with the next URL
    if (nextUrlFromLinkElements) {
      const nextUrl = `${domainUrl}${nextUrlFromLinkElements}`
      return getSpriteUrls(
        page,
        nextUrl,
        pageSpriteUrls,
        mainDOMSelector,
        nextPageDOMSelector,
        domainUrl,
      )
    }
  } catch (error) {
    console.error(`An error occurred while navigating: ${error}`)
  }

  return spriteUrls
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
      PKMN_HOME_ICONS_SPRITE_URL_PAGE_1,
      [],
      PKMN_HOME_ICONS_MAIN_DOM_SELECTOR,
      PKMN_HOME_ICONS_NEXT_PAGE_DOM_SELECTOR,
      PKMN_HOME_ICONS_DOMAIN,
    )

    console.log(
      spriteUrls.map(url => {
        const folderName = getNationalNbFromString(url || '0000')
        const fileName = ''
        return {
          url,
          filePath: `sprites/${folderName}/${fileName}`,
        }
      }),
    )

    return []
  },
}
