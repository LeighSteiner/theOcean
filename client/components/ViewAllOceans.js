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
       <h3 className="greenText f4 bold center mw5 br4"> Every Ocean in the Universe</h3>
        <div className="grayBackground oceans-list list pl0 ml0 center mw5 ba b--light-silver br3">
        { oceans && oceans.length ? 
          oceans.map( ocean => ( <li key={ocean.id} className="ph3 pv2 bb b--light-silver"><Link to={`/oceans/${ocean.id}`}>{ocean.name} - {ocean.description} </Link> </li>) ) : null
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

export default connect(mapState, mapDispatch)(ViewAllOceans)
