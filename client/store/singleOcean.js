import axios from 'axios';
import history from '../history';


//action types

const GET_ONE_OCEAN = 'GET_ONE_OCEAN'


// initial state

const oneOcean = {}

//action creator

const getOneOcean = (ocean) => ({type: GET_ONE_OCEAN, ocean})

//thunk creator

export const fetchOneOcean = (oceanId) => {
  return function thunk(dispatch) {
  	return axios.get(`/api/oceans/ocean/${oceanId}`)
  	.then( res => dispatch(getOneOcean(res.data)))
  	.catch((error) => { console.log(error); });
  };
}

export const makeNewOcean = (ocean) => {
  return function thunk(dispatch) {
    return axios.post('/api/oceans/new-ocean', ocean)
    .then( res => { return dispatch(getOneOcean(res.data)) })
    .catch((error) => { console.log(error); } );
  }
}

//reducer

export default function (state = oneOcean, action) {
  switch(action.type) {
  	case GET_ONE_OCEAN:
  	  return action.ocean
  	default:
  	  return state
  }
}