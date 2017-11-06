import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserHeadBubbles } from '../store';

class MyBubbleView extends Component {
  constructor(props) {
  	super(props)
  }

  componentDidMount() {
    this.props.loadHeadBubbles(this.props.user.id)
  }

  render() {
  	return (
      <div className="my-bubble-view">
        <h2>Your Bubbles</h2>
        <ul>
       {
       	userHeadBubbles && userHeadBubbles.length ? 
       	this.props.userHeadBubbles.map( (bubble) => 
          (<li key={bubble.id}>
           <Link to={`/bubbles/${bubble.id}`}>{bubble.message}</Link>
          </li>)
       		):null
       }
       </ul> 
      </div>
  	)
  }
}

const mapState = state => ({
  user: state.user, 
  userHeadBubbles: state.userHeadBubbles
})

const mapDispatch = dispatch => ({
  loadHeadBubbles(userId){  return dispatch(fetchUserHeadBubbles(userId))}
})

export default connect(mapState, mapDispatch)(MyBubbleView)