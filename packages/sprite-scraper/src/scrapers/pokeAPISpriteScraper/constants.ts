import type { EmptyScraperOptionsType } from '../../types'

// official sprites
export const officialSpritesOptions = {
  nbPkmns: 1012,
  prefix: 'official-',
  getSpriteUrl: nb =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${nb}.png`,
} as EmptyScraperOptionsType

// front sprites
export const frontSpritesOptions = {
  nbPkmns: 1011,
  prefix: 'pixel-front-',
  getSpriteUrl: nb =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nb}.png`,
} as EmptyScraperOptionsType

// pokemon home sprites
export const pkmnHomeSpriteOptions = {
  nbPkmns: 1010,
  prefix: 'pkmn-home-',
  getSpriteUrl: nb => `https://www.pokebip.com/pokedex-images/300/${nb}.png`,
} as EmptyScraperOptionsType

// pokemon home large sprites
export const pkmnHomeLargeSpriteOptions = {
  nbPkmns: 906,
  prefix: 'pkmn-home-large-',
  getSpriteUrl: nb =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${nb}.png`,
} as EmptyScraperOptionsType
