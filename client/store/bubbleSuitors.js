import axios from 'axios';
import history from '../history';

//action types 

const GET_SUITORS = 'GET_SUITORS'

//initial state

const suitors = []

//action creators 

const getSuitors = (suitors) => ({type: GET_SUITORS, suitors})

//thunk creator

export const fetchSuitors = (bubbleId) => {
  return function thunk(dispatch) {
  	return axios.get(`/api/bubbles/${bubbleId}/suitors`)
  	.then( res => dispatch(getSuitors(res.data)))
  	.catch((error) => { console.log(error)})
  }
}

//reducer 

export default function ( state = suitors, action) {
  switch(action.type) {
  	case GET_SUITORS:
  	  return action.suitors
  	default:
      return state
  }
}