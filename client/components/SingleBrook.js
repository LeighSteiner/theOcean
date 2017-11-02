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
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(e) {
    this.setState({draft: e.target.value})
  } 

  handleSubmit(e) {
  	e.preventDefault();
  	const response = {
  	  message: this.state.draft, 
  	  isHead: false, 
  	  isHooked: true, 
  	  userId: this.props.user.id, 
  	  brookId: this.props.singleBrook.id
  	}
  	// const updatedBrook = { numBubbles: this.props.singleBrook.numBubbles++}
  	this.props.postNewBrookBubble(response)
  	.then(() => {
  		this.setState({draft: ""});
  	})
  	// this.props.updateBrook(updatedBrook, this.props.singleBrook.id);
  }

  componentDidMount() {
    const brookId = this.props.match.params.brookId
    this.props.loadOneBrook(brookId);
    this.props.loadBrookBubbles(brookId); 
  } 
  componentWillReceiveProps(nextProps){
    //if nextProps doesnt equal this.props, load brook bubbles 
    // if(nextProps.brookBubbles.length !== this.props.brookBubbles.length){
    //   this.props.loadBrookBubbles(brookId);
    // }
  }

  render() {
  	const bubbles = this.props.brookBubbles
    let person = "";
    return (
      <div className="single-brook">
        <h2>your path so far</h2> 
        <ul>
        {
          bubbles && bubbles.length ?
            bubbles.map(bubble => {
              if (bubble.userId == this.props.user.id){
                person = "Me"
              }else{
                person = "You"
              }
              return (
             <li key={bubble.id} className="message-in-thread">
                <span>{person}</span><br/>
              Sent: {bubble.createdAt}
              <br/>
              Spoken: {bubble.message}
             </li>
            	)}) :null
        }
        </ul> 
        <form className="new-message" onSubmit={this.handleSubmit} >
          <label>Reply: </label>
          <input name="reply" onChange={this.handleChange} value={this.state.draft}/>
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
	postNewBrookBubble(bubble){ return dispatch(moreBrookBubbles(bubble))},
	updateBrook(brook, brookId){ return changeOneBrook(brook, brookId)} 
})

export default connect(mapState, mapDispatch)(SingleBrook)

