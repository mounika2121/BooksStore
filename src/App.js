import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/:id" component={BookDetails} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
