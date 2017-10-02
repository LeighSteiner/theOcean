import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {  fetchOneBubble, fetchSuitors } from '../store'

class SingleBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hookedBubble: null, 
      hookedMessage: ""
    };
    this.hookBubble = this.hookBubble.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hookBubble(e) {
     this.setState({hookedBubble: e.target.key, hookedMessage: e.target.value})
  }

  handleSubmit(e) {
    preventDefault(e);
    //thunk that updates bubble goes here. 
  }

  componentDidMount() {
  	const bubbleId = +this.props.match.params.bubbleId
  	this.props.loadOneBubble(bubbleId)
  	.then((action) => {
  	  if(action.bubble.isHead && !action.bubble.isHooked ){
  	  	return this.props.loadSuitors(bubbleId)
  	  }
      if(action.bubble.isHead && action.bubble.isHooked){
        //loadStream() ==> write this function
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

      {
      	suitors && suitors.length ? 
      	 suitors.map( suitor => (<button key={suitor.id} onClick={this.hookBubble} value={suitor.message}> {suitor.message} </button>)) : null
      }
      {
        this.state.hookedBubble ? 
        <div>
        <p>     Are you sure you want to hook the bubble that reads {this.state.hookedMessage}? 
          You will not be able to see or respond to other bubbles after this. </p>
        <button type="submit" onClick={this.handleSubmit}>
          I'm sure! Hook this bubble!
        </button>
        <div> : null
      }
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