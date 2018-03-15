import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOneOcean, fetchOceanBubbles } from '../store';
import  BubbleVisualization  from './BubbleVisualization';
// import * as d3 from "d3";
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
        <BubbleVisualization oceanBubbles={bubbles} /> : null
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