import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './Components/Login'
import ProtectedRoute from './Components/ProtectedRoute'
import Home from './Components/Home'
import Jobs from './Components/Jobs'
import JobDetails from './Components/JobDetails'

import './App.css'
import NotFound from './Components/NotFound'

const App = () => {
  console.log('uuh')
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  )
}

export default App
