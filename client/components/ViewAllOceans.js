import React, { Component } from 'react';
import { connect } from 'react-redux';
// import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import { fetchOceans } from '../store'

class ViewAllOceans extends Component {
  constructor(props) {
  	super(props);
  	this.state = {};
  }

  componentDidMount() {
    this.props.loadOceans()
  }

  render() {
  	const oceans = this.props.allOceans
  	return (
      <div className="view-all-oceans">
       <h3>Every Ocean in the Universe</h3>
        <div className="oceans-list">
        { oceans && oceans.length ? 
          oceans.map( ocean => ( <Link to={`/oceans/${ocean.id}`} key={ocean.id}>{ocean.name} - {ocean.description} </Link> ) ) : null
        }
        </div>
      </div>
  	);
  }
}

const mapState = state => ({
 allOceans: state.allOceans
})

const mapDispatch = dispatch => ({
  loadOceans(){ return dispatch(fetchOceans())}
})


