import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {  fetchOneBubble, fetchSuitors } from '../store'

class SingleBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  	const bubbleId = +this.props.match.params.bubbleId
  	this.props.loadOneBubble(bubbleId)
  	.then((action) => {
  	  if(action.bubble.isHead){
  	  	return this.props.loadSuitors(bubbleId)
  	  }
  	})
  }

  render() {
    const bubble = this.props.singleBubble;
    const suitors = this.props.bubbleSuitors;
  	return(
      <div className="single-bubble">
      {
      	bubble ? 
        <p>{bubble.message}</p>
      	:null
      }
      <ul>
      {
      	suitors && suitors.length ? 
      	 suitors.map( suitor => (<li key={suitor.id}> {suitor.message}</li>)) : null
      }
      </ul>
      </div>
  		)
  }
}

const mapState = state => ({
  singleBubble: state.singleBubble, 
  user: state.user, 
  bubbleSuitors: state.bubbleSuitors

})

const mapDispatch = dispatch => ({
  loadOneOcean(oceanId){ return dispatch(fetchOneOcean(oceanId))}, 
  loadOneBubble(bubbleId){ return dispatch(fetchOneBubble(bubbleId))},
  loadSuitors(bubbleId){ return dispatch(fetchSuitors(bubbleId))}
})

export default connect(mapState, mapDispatch)(SingleBubble)