import axios from 'axios';
import history from '../history';

//action types 

const GET_SUITORS = 'GET_SUITORS'
const MAKE_NEW_SUITOR = 'MAKE_NEW_SUITOR'

//initial state

const suitors = []

//action creators 

const getSuitors = (suitors) => ({type: GET_SUITORS, suitors})
const makeNewSuitor = (suitor) => ({type: MAKE_NEW_SUITOR, suitor})

//thunk creator

export const fetchSuitors = (bubbleId) => {
  return function thunk(dispatch) {
  	return axios.get(`/api/bubbles/${bubbleId}/suitors`)
  	.then( res => dispatch(getSuitors(res.data)))
  	.catch((error) => { console.log(error)})
  }
}

export const postNewSuitor = (suitor) => {
  return function thunk(dispatch) {
    return axios.post(`/api/bubbles/new-bubble`, suitor)
    .then( res => dispatch(makeNewSuitor(res.data)))
    .catch((error) => { console.log(error); })
  }
}

//reducer 

export default function ( state = suitors, action) {
  switch(action.type) {
  	case GET_SUITORS:
  	  return action.suitors
    case MAKE_NEW_SUITOR: 
      return [...state, action.suitor]
  	default:
      return state
  }
}