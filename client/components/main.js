import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props

  return (
    <header className="oceanBackground bg-white black-80 tc pv4 avenir">
     
      <h1 className="link dim greenText b f1 f-headline-ns tc db mb3 mb4-ns">The Ocean</h1>
      <h2 className="link dim greenText f2 f5-ns dib mr3"> Just fall the fuck in...love </h2>
      
      <nav className="tc mw7 center mt4">
        {
          isLoggedIn
            ? <div className="grayBackground br4">
              {/* The navbar will show these links after you log in */}
              <Link className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l"  to='/home'>Home</Link>
              <Link className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" to='/universe'>The Universe</Link>
              <Link className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" to='/my-bubbles'>My Bubbles</Link>
              <Link className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" to= '/my-brooks'>My Brooks</Link>
              <Link className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" to= '/new-bubble'>Blow a Bubble</Link>
              <Link className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" to='/new-ocean'>Fill An Ocean</Link> 
              <a className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" href='#' onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" to='/login'>Login</Link>
              <Link className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" to='/signup'>Sign Up</Link>
            </div>
        }
      </nav>
      {children}
    </header>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
