import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { makeNewFirstBubble, fetchOceans } from '../store';

class NewBubbleForm extends Component {
  constructor() {
  	super();
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
   e.preventDefault();

   const theBubble = {
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
     <label className="greenText">What Ocean will you drop your bubble in?</label>
     <select onChange={this.handleOceanChange} name="ocean">
      {
        oceans && oceans.length ? 
        oceans.map( ocean => (<option key={ocean.id} value={ocean.id}>{ocean.name}</option>)) : null
      }
      </select> 
      <br/>
     <label className="greenText">What is the message in your bottle?</label>
     <textarea className="br-pill center b--light-silver" name="message"/>
     <br/>
     <button className="f6 link dim br-pill ph3 pv2 mb2 dib grayBackground avenir" type="submit">Blow Your Bubble</button>
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