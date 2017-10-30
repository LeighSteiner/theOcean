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
      hookedMessage: "", 
      hookedId: null
    };
    this.hookBubble = this.hookBubble.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }

  hookBubble(e) {
     this.setState({ hookedMessage: e.target.value, hookedId: e.target.id })

  }

  handleYes(e){
    this.props.createBrook()
    .then((action) => {

      let newBubble = {...this.props.singleBubble, isHooked: true, brookId : action.brook.id}
      return this.props.changeBubble(this.props.singleBubble.id, newBubble)
    })
    .then((action) => {
      
      let responseBubble = {isHooked: true, brookId: action.bubble.brookId}
      return this.props.changeBubble(this.state.hookedId, responseBubble)
    })
    .then(() => {
      console.log('done -- now you should be redirected to your brook view')
      //redirect to brook view. 
      //maybe you should make a brook view
    })

  }

  handleNo(e){
    this.setState({hookedMessage: "", hookedId: null})
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
        //alternately -- load 'this bubble has been hooked' component
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
      	 suitors.map( suitor => (<button key={suitor.id} id={suitor.id} onClick={this.hookBubble} value={suitor.message}> {suitor.message} </button>)) : null
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