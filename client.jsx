import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ExoticsPage from './pages/Exotics'
import ResultsPage from './pages/Results'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ExoticsPage} />
      <Route exact path="/results" component={ResultsPage} />
    </Switch>
  </BrowserRouter>,

  document.getElementById('root'),
)
