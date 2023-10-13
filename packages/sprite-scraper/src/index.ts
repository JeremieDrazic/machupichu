import { startBrowser } from './browser'
import { scraperController } from './pageController'

const browserInstance = startBrowser()
void scraperController(browserInstance)
