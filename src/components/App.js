import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Login from './Login'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import { LoadingBar } from 'react-redux-loading-bar'
import Nav from './Nav'
import NotFound from './404page'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
    
  
  render() {
    return (
      <Router>
        <Fragment>
          {this.props.loading ? null : (
            <Fragment>
              <LoadingBar />
              <Nav />
              <div>
                {this.props.loggedOut ? (
                  <Login />
                ) : (
                  <Switch>
                    <Route exact path='/' >
                      <Redirect to='Home' />  
                    </Route>
                    <Route path='/Home' component={Dashboard} />
                    <Route path='/questions/:question_id' component={QuestionPage} />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route path='/add' component={NewQuestion} />  
                    <Route path='/not-found' component={NotFound} />  
                  </Switch>  
              )}
              </div>
            </Fragment>
          )}
        </Fragment>
      </Router>    
    )  
  }
}      

  function mapStateToProps ({ authedUser }) {
    return {
      loading: authedUser === null,
      loggedOut: authedUser === "LOGGED_OUT" 
    }
  }
  
  export default connect(mapStateToProps)(App)