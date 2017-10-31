import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  	//send new bubble from this.state.draft
  	//update brook with numBubbles
  }

  componentDidMount() {
    //load brook 
    //load brook bubbles
    //not order dependent 
  } 
  componentWillReceiveProps(nextProps){
    //if nextProps doesnt equal this.props, load brook bubbles 
  }

  render() {
    return (
      <div className="single-brook">
        <h2>your path so far</h2> 
        <form className="new-message" onSumbit={this.handleSubmit}>
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
  singleBrook: state.singleBrook
  brookBubbles: state.brookBubbles
})

const mapDispatch = dispatch => ({
	//load brook
	//load brook bubbles
	// send new bubble 
})

export default connect(mapState, mapDispatch)(SingleBrook)

