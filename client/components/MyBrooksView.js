import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserBrookHeads } from '../store';

class MyBrooksView extends Component {
  constructor(props){
  	super(props)
  }
  componentDidMount() {
  	this.props.loadBrookHeads(this.props.user.id)
  }

  render() {
  	return (
      <div className="my-brooks-view">
        <h2 className="greenText">Your brooks</h2>
        <ul>
        {
          this.props.userBrookHeads && this.props.userBrookHeads.length ?
          this.props.userBrookHeads.map((brookHead) =>
             (
             	<li key={brookHead.id}>
             	<Link to={`/brooks/${brookHead.brookId}`}>
             	  This brook springs from "{brookHead.message}"
             	</Link>
             	</li>
              )
          	) : <div> you have no bubbling brooks </div>
        }
        </ul>
      </div>
  	)
  }
}

const mapState = state => ({
  user: state.user, 
  userBrookHeads: state.userBrookHeads
})

const mapDispatch = dispatch => ({
  loadBrookHeads(userId){ return dispatch(fetchUserBrookHeads(userId))}
})

export default connect(mapState, mapDispatch)(MyBrooksView)