import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeNewOcean } from '../store';

class NewOceanForm extends Component {
  constructor(){
  	super();
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  	const newOcean = {
      name: e.target.name.value, 
      description: e.target.description.value, 
      userId: this.props.user.id
  	}
  	this.props.createOcean(newOcean)
  	.then((action) => {
      this.props.history.push(`/oceans/${action.ocean.id}`)
  	})
  }

  render() {
  	return (
      <div className='new-ocean-form'>
       <h1 className="greenText">Make a new Ocean to redefine Love</h1>
       <form onSubmit={this.handleSubmit}>
         <label className="greenText">What is your Ocean's name?</label>
         <input className="br-pill center b--light-silver" name='name' />
         <br />
         <label className="greenText">Describe The Flora and Fauna in your Ocean: </label>
         <textarea className="br-pill center b--light-silver" name='description' /> 
         <br />
         <button className="f6 link dim br-pill ph3 pv2 mb2 dib grayBackground"  type='submit'> Fill Your Ocean </button> 
       </form>
      </div> 
  	)
  }
}

const mapState = state => ({
  user: state.user,
  singleOcean: state.singleOcean,
})

const mapDispatch = (dispatch) => ({
  createOcean(ocean){ return dispatch(makeNewOcean(ocean)); }, 
})

export default connect(mapState, mapDispatch)(NewOceanForm);