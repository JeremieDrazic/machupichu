import { padWithLeadingZeros } from 'utils'
import type { EmptyScraperObjType } from '../../types'

export const pokeAPISpriteScraper: EmptyScraperObjType = {
  scraper: ({ nbPkmns, getSpriteUrl, prefix }) => {
    const sprites: string[] = []

    for (let i = 1; i < nbPkmns; i++) {
      sprites.push(getSpriteUrl(i))
    }

    return sprites.map((url, index) => ({
      url,
      index: index + 1,
      filePath: `sprites/${padWithLeadingZeros(index + 1)}/${prefix}${padWithLeadingZeros(
        index + 1,
      )}.png`,
    }))
  },
}
