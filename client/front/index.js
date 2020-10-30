import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
            <h1>
              Home test
            </h1>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))
