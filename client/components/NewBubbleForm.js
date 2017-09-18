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
  	 oceanId: "", //the default setting will be to send it to cosmic ocean "id:1"
  	 userId: 1
  	}
  }

  // handleChange(e){
  // 	this.setState({e.target.name: e.target.value})
  // }

  handleSubmit(e){}

  render() {
  	console.log('the state!', this.state)
  	return (
     <div className='new-bubble-form'>
     <label>What Ocean will you drop your bubble in?</label>
     <input className="ocean"/>
     <label>What is the message in your bottle?</label>
     <input className="message"/>
     </div>
  		)
  }
}

const mapState = state => ({
  // user: user
})

const mapDispatch = (dispatch) => ({})

export default connect(mapState,mapDispatch)(NewBubbleForm);