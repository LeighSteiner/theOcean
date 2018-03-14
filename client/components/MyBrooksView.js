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
      <div className="list pl0 ml0 mw5  br3 center">
        <h2 className="greenText">Your brooks</h2>
        <ul>
        {
          this.props.userBrookHeads && this.props.userBrookHeads.length ?
          this.props.userBrookHeads.map((brookHead) =>
             (
             	<li className="f6 link dim br-pill ph3 pv2 mb2 dib grayBackground" key={brookHead.id}>
             	<Link to={`/brooks/${brookHead.brookId}`}>
             	  This brook springs from "{brookHead.message}"
             	</Link>
             	</li>
              )
          	) : <div className="greenText"> you have no bubbling brooks </div>
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