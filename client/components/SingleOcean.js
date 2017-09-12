import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOneOcean, fetchOceanBubbles } from '../store'

class SingleOcean extends Component {
  constructor(props) {
  	super(props);
  	this.state = {};
  }

  componentDidMount() {
  	this.props.loadOneOcean(oceanId)
  	.then(() => { return loadOceanBubbles(oceanId)})
  }

  render(){
  	const ocean = this.props.ocean
  	const bubbles = this.props.bubbles
  	return (
  	 <div className="single-ocean">
      <h3>{ocean.name}</h3> 
      <h4>{ocean.description}</h4>
      <ul>
      {
      	bubbles && bubbles.length ? 
      	bubbles.map ( bubble => ( <li key={ocean.id}>{ocean.name} </li> )) : null
      }
      </ul>
     </div>
  	)
  }
}

const mapState = state => ({
  ocean: state.ocean, 
  bubbles: state.bubbles
})

const mapDispatch = dispatch => ({
  loadOneOcean(oceanId){ return dispatch(fetchOneOcean(oceanId))}, 
  loadOceanBubbles(oceanId){ return dispatch(fetchOceanBubbles(oceanId))}
})

export default connect(mapState, mapDispatch)(SingleOcean);