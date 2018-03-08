import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import store, { fetchUserMessageList } from '../store';

//rewrite as smart component 
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <h3>Come on in, the water's fine.</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
