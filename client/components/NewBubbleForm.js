import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { makeNewFirstBubble, fetchOceans } from '../store';

//for now, this is the form only for a new Bubble to be dropped in the ocean
//make the bubble, then choose an ocean for it to be dropped into, after which it will update with the ocean


class NewBubbleForm extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  	 message:"", 
  	 ocean: 1, //the default setting will be to send it to cosmic ocean "id:1"
  	 userId: 0, //not a real user -- if we see userId: 0 we know something is wrong
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

   let theBubble = {
    message: this.state.message,
    oceanId: this.state.ocean,
    userId: this.props.user.id, 
    isHead: true,
   }
   this.props.blowBubble(theBubble)
   .then(() => {
    this.setState({
    message: "", 
    ocean: 1, 
    userId: 0,
   })
   })
   
  }

  componentDidMount(){
    this.props.loadOceans();
  }

  render() {
    let oceans = this.props.allOceans;
  	return (
     <div className='new-bubble-form'>
     <label>What Ocean will you drop your bubble in?</label>
     <select onChange={this.handleOceanChange}>
      {
        oceans && oceans.length ? 
        oceans.map( ocean => (<option key={ocean.id} value={ocean.id}>{ocean.name}</option>)) : null
      }
      </select>
     <label>What is the message in your bottle?</label>
     <input name="message" onChange={this.handleMessageChange}/>
     <br/>
     <button className="blow-button" type="submit" onClick={this.handleSubmit}>Blow Your Bubble</button>
     </div>
  		)
  }
}

const mapState = state => ({
  user: state.user, 
  allOceans: state.allOceans,
})

const mapDispatch = (dispatch) => ({
  blowBubble(bubble){ return dispatch(makeNewFirstBubble(bubble))}, 
  loadOceans(){ return dispatch(fetchOceans()) }
})

export default connect(mapState,mapDispatch)(NewBubbleForm);