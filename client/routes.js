import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, 
         Login, 
         Signup, 
         UserHome, 
         ViewAllOceans, 
         SingleOcean, 
         SingleBubble, 
         NewBubbleForm, 
         SingleBrook, 
         MyBubbleView,
         MyBrooksView, 
         NewOceanForm } from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path='/new-bubble' component={NewBubbleForm}/>
                  <Route path='/universe' component={ViewAllOceans}/>
                  <Route path='/oceans/:oceanId' component={SingleOcean}/>
                  <Route path='/bubbles/:bubbleId' component={SingleBubble}/>
                  <Route path='/brooks/:brookId' component={SingleBrook} />
                  <Route path='/my-bubbles' component={MyBubbleView} />
                  <Route path='/my-brooks' component={MyBrooksView} />
                  <Route path='/home' component={UserHome} />
                  <Route path='/new-ocean' component={NewOceanForm} />
                  <Route component={ViewAllOceans} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
