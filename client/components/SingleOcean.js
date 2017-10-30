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
  	const oceanId = +this.props.match.params.oceanId
  	this.props.loadOneOcean(oceanId)
  	this.props.loadOceanBubbles(oceanId)
  }

  render() {
  	const ocean = this.props.singleOcean
  	const bubbles = this.props.oceanBubbles//.filter((ocean) => ocean.isHead) 

    console.log('PROPS', this.props)
  	return (
  	 <div className="single-ocean">
     {
     	ocean && bubbles ? 
      <div>
      <h3>{ocean.name}</h3> 
      <h4>{ocean.description}</h4>
      <ul>
       {
      	bubbles && bubbles.length ? 
      	bubbles.map ( bubble => ( 
          <li key={bubble.id}>
          <Link to={`/bubbles/${bubble.id}`}>
           {bubble.message} 
          </Link>
          </li> )) : null
       }
      </ul>
      </div> : null
     }
     </div>
  	)
  }
}

const mapState = state => ({
  singleOcean: state.singleOcean,
  oceanBubbles: state.oceanBubbles,
})

const mapDispatch = dispatch => ({
  loadOneOcean(oceanId){ return dispatch(fetchOneOcean(oceanId))}, 
  loadOceanBubbles(oceanId){ return dispatch(fetchOceanBubbles(oceanId))}
})

export default connect(mapState, mapDispatch)(SingleOcean);