import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { makeNewFirstBubble, fetchOceans } from '../store';

//for now, this is the form only for a new Bubble to be dropped in the ocean
//make the bubble, then choose an ocean for it to be dropped into, after which it will update with the ocean


class NewBubbleForm extends Component {
  constructor(props) {
  	super(props)
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
   e.preventDefault();

   let theBubble = {
    message: e.target.message.value,
    oceanId: e.target.ocean.value,
    userId: this.props.user.id, 
    isHead: true,
   }
   this.props.blowBubble(theBubble)
   e.target.message.value = "";
   }

  componentDidMount(){
    this.props.loadOceans();
  }

  render() {
    let oceans = this.props.allOceans;
  	return (
     <div className='new-bubble-form'>
     <form onSubmit={this.handleSubmit}>
     <label>What Ocean will you drop your bubble in?</label>
     <select onChange={this.handleOceanChange} name="ocean">
      {
        oceans && oceans.length ? 
        oceans.map( ocean => (<option key={ocean.id} value={ocean.id}>{ocean.name}</option>)) : null
      }
      </select>
     <label>What is the message in your bottle?</label>
     <textarea name="message"/>
     <br/>
     <button className="blow-button" type="submit">Blow Your Bubble</button>
     </form>
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