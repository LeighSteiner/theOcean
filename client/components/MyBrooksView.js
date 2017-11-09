import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserBrookHeads } from '../store';

class MyBrooksView extends Component {
  constructor(props){
  	super(props)
  }
  componentDidMount() {
  	//write this function
  	this.props.loadBrookHeads(this.props.user.id)
  }

  render() {
  	return (
      <div className="my-brooks-view">
        <h2>Your brooks</h2>
        <ul>
        {
          this.props.userBrookHeads && this.props.userBrookHeads.length ?
          this.props.userBrookHeads.map((brookHead) =>
             (
             	<li key={brookHead.id}>
             	<Link to={`/brooks/${brookHead.brookId}`}>
             	  This brook springs from <span className="circle"><span className="circle-item">"{brookHead.message}"</span></span>
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