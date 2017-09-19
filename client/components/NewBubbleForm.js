import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import {/* redux things */} from '../store';

//for now, this is the form only for a new Bubble to be dropped in the ocean


class NewBubbleForm extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  	 message:"", 
  	 ocean: "", //the default setting will be to send it to cosmic ocean "id:1"
  	 userId: 1
  	}
  	this.handleMessageChange = this.handleMessageChange.bind(this);
  	this.handleOceanChange = this.handleOceanChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleMessageChange(e) { 
  	this.setState({message: e.target.value})
  }

  handleOceanChange(e) {
  	this.setState({ocean: e.target.value})
  }

  handleSubmit(e){
   e.preventDefault();
   //create message from state, send thunk from store
   console.log('here is where i would blow a bubble')
   console.log('YOOZER', this.props.user.id)
  }

  render() {
  	console.log('the state!', this.state)
  	return (
     <div className='new-bubble-form'>
     <label>What Ocean will you drop your bubble in?</label>
     <input name="ocean" onChange={this.handleOceanChange}/>
     <label>What is the message in your bottle?</label>
     <input name="message" onChange={this.handleMessageChange}/>
     <br/>
     <button className="blow-button" type="submit" onClick={this.handleSubmit}>Blow Your Bubble</button>
     </div>
  		)
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = (dispatch) => ({})

export default connect(mapState,mapDispatch)(NewBubbleForm);