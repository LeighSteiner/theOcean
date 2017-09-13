import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOneOcean, fetchOneBubble } from '../store'

class SingleBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  	const bubbleId = +this.props.match.params.bubbleId
  	this.props.loadOneBubble(bubbleId)
  	.then((bubble) => {
  	  // return this.props.loadOneOcean(bubble.oceanId)
  	  console.log('load ocean here if you need it')
  	})
  }

  render() {
    const bubble = this.props.singleBubble;
    const ocean = this.props.singleOcean;
  	return(
      <div className="single-bubble">
      {
      	bubble ? 
        <p>{bubble.message}</p>
      	:null
      }
      </div>
  		)
  }
}

const mapState = state => ({
  singleBubble: state.singleBubble, 
  singleOcean: state.singleOcean, 
  user: state.user

})

const mapDispatch = dispatch => ({
  loadOneOcean(oceanId){ return dispatch(fetchOneOcean(oceanId))}, 
  loadOneBubble(bubbleId){ return dispatch(fetchOneBubble(bubbleId))}
})

export default connect(mapState, mapDispatch)(SingleBubble)