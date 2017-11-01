import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOneBrook, 
	     fetchBrookBubbles, 
	     moreBrookBubbles,
	     changeOneBrook } from '../store';

class SingleBrook extends Component {
  constructor(props){
    super(props)
    this.state = {
      draft: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(e) {
    this.setState({draft: e.target.value})
  } 

  handleSubmit(e) {
  	e.preventDefault();
  	const newBubble = {
  	  message: this.state.draft, 
  	  isHead: false, 
  	  isHooked: true, 
  	  userId: this.props.user.id, 
  	  brookId: this.props.singleBrook.id
  	}

  	const updatedBrook = { numBubbles: this.props.singleBrook.numBubbles++}
  	this.props.postNewBrookBubble(newBubble);
  }

  componentDidMount() {
    const brookId = this.props.match.params.brookId
    this.props.loadOneBrook(brookId);
    this.props.loadBrookBubbles(brookId); 
  } 
  componentWillReceiveProps(nextProps){
    //if nextProps doesnt equal this.props, load brook bubbles 
    if(nextProps.brookBubbles.length !== this.props.brookBubbles.length){
      this.props.loadBrookBubbles(brookId);
    }
  }

  render() {
    return (
      <div className="single-brook">
        <h2>your path so far</h2> 
        <form className="new-message" onSubmit={this.handleSubmit}>
          <label>Reply: </label>
          <input name="reply" onChange={this.handleChange} />
          <button type="submit">blow!</button>
        </form>
      </div>
      )
  }
}






const mapState = state => ({
  user: state.user,  
  singleBrook: state.singleBrook, 
  brookBubbles: state.brookBubbles
})

const mapDispatch = dispatch => ({
	loadOneBrook(brookId){ return dispatch(fetchOneBrook(brookId)) },
    loadBrookBubbles(brookId){ return dispatch(fetchBrookBubbles(brookId)) },
	postNewBrookBubble(bubble){ return dispatch(moreBrookBubbles(bubble))} 
})

export default connect(mapState, mapDispatch)(SingleBrook)

