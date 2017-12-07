import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {  fetchOneBubble, 
          fetchSuitors, 
          updateOneBubble,
          postNewBrook,
          postNewSuitor,
          changeOneBrook,
          blockUser } from '../store';

class SingleBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hookedMessage: "", 
      hookedId: null, 
      suitorText: "",
    };
    this.hookBubble = this.hookBubble.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlock = this.handleBlock.bind(this);
  }

  hookBubble(e) {
     this.setState({ hookedMessage: e.target.value, hookedId: e.target.id })

  }

  handleYes(e) {
    this.props.createBrook()
    .then((action) => {
      let newBubble = {...this.props.singleBubble, isHooked: true, brookId : action.brook.id}
      return this.props.changeBubble(this.props.singleBubble.id, newBubble)
    })
    .then((action) => {
      
      let responseBubble = {isHooked: true, brookId: action.bubble.brookId}
      return this.props.changeBubble(this.state.hookedId, responseBubble)
    })
     .then((action) => {
      this.props.history.push(`/brooks/${action.bubble.brookId}`)
    })
   

  }

  handleNo(e) {
    this.setState({hookedMessage: "", hookedId: null})
  }

  handleChange(e) {
    this.setState({suitorText: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    let suitor = {
      message: this.state.suitorText, 
      ocean: this.props.singleBubble.oceanId, 
      userId: this.props.user.id, 
      headId: this.props.singleBubble.id, 
      isHead: false, 
      isHooked: false, 
    }
    this.props.createSuitor(suitor)
    .then(() => {
      this.setState({suitorText: ""})
    });
  }

  handleBlock(e){
     const blockMatch = {
      blocker: this.props.user.id, 
      blockeeId: this.props.singleBubble.userId
     }
     console.log('BLOCK THIS BITCH')
     this.props.createBlock(blockMatch,this.props.singleBubble.userId);
     console.log('BITCH HAS BEEN BLOCKED ')
  }

  componentDidMount() {
  	const bubbleId = +this.props.match.params.bubbleId
  	this.props.loadOneBubble(bubbleId)
  	.then((action) => {
  	  if(action.bubble.isHead && !action.bubble.isHooked && action.bubble.userId === this.props.user.id ){
  	  	return this.props.loadSuitors(bubbleId)
  	  }
      if(action.bubble.isHead && action.bubble.isHooked){
        this.props.history.push(`/brooks/${action.bubble.brookId}`)
      }
  	})
  }

  render() {
    const bubble = this.props.singleBubble;
    const suitors = this.props.bubbleSuitors;
    console.log('BLOCKER', this.props.user.id)
    console.log('BlOCKEE', this.props.singleBubble.userId)


  	return(
      <div className="single-bubble">
      {
      	bubble ? 
        <p>{bubble.message}</p>
      	:null
      }

      {
      	suitors && suitors.length && this.props.user.id === bubble.userId ? 
      	 suitors.map( suitor => (<button key={suitor.id} id={suitor.id} onClick={this.hookBubble} value={suitor.message}> {suitor.message} </button>)) : null
      }
      {
        this.props.user.id !== bubble.userId ? 
        <form className="write-response" onSubmit={this.handleSubmit}>
          <label>Blow a bubble, see if it gets hooked</label>
          <input name="suitor" onChange={this.handleChange} value={this.state.suitorText}/>
          <button type="submit">blow!</button>
        </form>:null
      }
      {
        this.props.user.id !== bubble.userId ? 
        <button className="block-button" onClick={this.handleBlock}> Block this user? </button>
        :null
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
  singleBrook: state.singleBrook, 
  blockedUsers: state.blockedUsers

})

const mapDispatch = dispatch => ({
  loadOneOcean(oceanId){ return dispatch(fetchOneOcean(oceanId))}, 
  loadOneBubble(bubbleId){ return dispatch(fetchOneBubble(bubbleId))},
  loadSuitors(bubbleId){ return dispatch(fetchSuitors(bubbleId))}, 
  changeBubble(bubbleId, bubble){ return dispatch(updateOneBubble(bubbleId, bubble))}, 
  createBrook(){ return dispatch(postNewBrook())}, 
  createSuitor(bubble){ return dispatch(postNewSuitor(bubble))},
  addBrookOwners(brook, brookId){ return dispatch(changeOneBrook(brook, brookId))},
  createBlock(blockMatch, blockee){ return dispatch(blockUser(blockMatch, blockee))}
})

export default withRouter(connect(mapState, mapDispatch)(SingleBubble))