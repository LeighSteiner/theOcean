import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {  fetchOneBubble, 
          fetchSuitors, 
          updateOneBubble,
          postNewBrook } from '../store'

class SingleBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hookedMessage: ""
    };
    this.hookBubble = this.hookBubble.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }

  hookBubble(e) {
     this.setState({ hookedMessage: e.target.value })

  }

  handleYes(e){
    console.log('MESSAGE HOOKED')
    this.props.createBrook()
    .then((brook) => {
      console.log('HI')
      let newBubble = {...this.props.singleBubble, isHooked: true, brookId : brook.id}
      return this.props.changeBubble(this.props.singleBubble.id, newBubble)
    })
    .then(() => {
      console.log('hello')
    })

  }

  handleNo(e){
    this.setState({hookedMessage: ""})
  }

  componentDidMount() {
  	const bubbleId = +this.props.match.params.bubbleId
  	this.props.loadOneBubble(bubbleId)
  	.then((action) => {
  	  if(action.bubble.isHead && !action.bubble.isHooked ){
  	  	return this.props.loadSuitors(bubbleId)
  	  }
      if(action.bubble.isHead && action.bubble.isHooked){
        //loadStream() ==> write this function (redirect to stream component?)
      }
      console.log('bubble loaded', action.bubble.isHooked)
  	})
  }

  render() {
    console.log('PROPS', this.props)
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
        this.state.hookedMessage ?
        <div className="hook-a-bubble">
          <p> are you sure you want to hook the bubble that reads "{this.state.hookedMessage}"? <br/>
          you can only reply to one bubble, and once you pick one, you won't have access to the others anymore.
          </p>
          <button onClick={this.handleYes}>yes</button><button onClick={this.handleNo}>no</button>
        </div>
         : null
      }
      </div>
  		)
  }
}

const mapState = state => ({
  singleBubble: state.singleBubble, 
  user: state.user, 
  bubbleSuitors: state.bubbleSuitors, 
  singleBrook: state.singleBrook

})

const mapDispatch = dispatch => ({
  loadOneOcean(oceanId){ return dispatch(fetchOneOcean(oceanId))}, 
  loadOneBubble(bubbleId){ return dispatch(fetchOneBubble(bubbleId))},
  loadSuitors(bubbleId){ return dispatch(fetchSuitors(bubbleId))}, 
  changeBubble(bubbleId, bubble){ return dispatch(updateOneBubble(bubbleId, bubble))}, 
  createBrook(){ return dispatch(postNewBrook())}, 
})

export default connect(mapState, mapDispatch)(SingleBubble)