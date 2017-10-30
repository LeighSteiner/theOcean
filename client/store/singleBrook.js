import axios from 'axios';


//action types

const MAKE_NEW_BROOK = 'MAKE_NEW_BROOK'
const GET_ONE_BROOK = 'GET_ONE_BROOK'


// initial state

const oneBrook = {}

//action creators

const makeNewBrook = (brook) => ({type: MAKE_NEW_BROOK, brook})
const getOneBrook = (brook) => ({type: GET_ONE_BROOK, brook})

//thunk creators

export const postNewBrook = () => {
  return function thunk(dispatch) {
  	return axios.post(`/api/brooks/new-brook`)
  	.then( res => dispatch(makeNewBrook(res.data)))
  	.catch((error) => { console.log(error);})
  }
}

export const fetchOneBrook = (brookId) => {
  return function thunk(dispatch) {
    return axios.get(`/api/brooks/${brookId}`)
    .then ( res => dispatch(getOneBrook(res.data)))
    .catch((error) => { console.log(error); })
  }
}

//reducer

export default function (state = oneBrook, action) {
  switch(action.type) {
  	case MAKE_NEW_BROOK:
  	  return action.brook;
  	case GET_ONE_BROOK:
  	  return action.brook;
  	default:
  	return state;
  }
}