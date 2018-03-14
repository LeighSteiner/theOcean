import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOneOcean, fetchOceanBubbles } from '../store'
import * as d3 from "d3";
class SingleOcean extends Component {
  constructor() {
  	super();
  }

  componentDidMount() {
  	const oceanId = +this.props.match.params.oceanId
  	this.props.loadOneOcean(oceanId)
  	this.props.loadOceanBubbles(oceanId)
  }

  render() {
  	const ocean = this.props.singleOcean
  	const bubbles = this.props.oceanBubbles
    
  	return (
  	 <div className="single-ocean">
     {
     	ocean && bubbles ? 
      <div>
      <h3 className="f4 bold center mw5 greenText">{ocean.name}</h3> 
      <h4 className="greenText">{ocean.description}</h4>
      <ul className="list pl0 ml0 mw5  br3 center">
       {
      	bubbles && bubbles.length ? 
      	bubbles.map ( bubble => ( 
          <li key={bubble.id} className="f6 link dim br-pill ph3 pv2 mb2 dib grayBackground" >
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