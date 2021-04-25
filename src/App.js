import React from 'react'
import { Route } from 'react-router-dom'

import ScraperView from './views/scraper/Scraper.view'

import GlobalStyles from './globalStyles'

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Route exact path='/' component={ScraperView} />
    </>
  )
}

export default App
