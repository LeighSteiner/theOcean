import axios from 'axios';
import history from '../history';

//action types

const GET_ONE_BUBBLE = 'GET_ONE_BUBBLE'
const NEW_FIRST_BUBBLE = 'NEW_FIRST_BUBBLE'
const UPDATE_BUBBLE = 'UPDATE_BUBBLE';


//initial state

const oneBubble = {}

//action creator 

const getOneBubble = (bubble) => ({type: GET_ONE_BUBBLE, bubble})
const newFirstBubble = (bubble) => ({type: NEW_FIRST_BUBBLE, bubble})
const updateBubble = (bubbleId) => ({type: UPDATE_BUBBLE, bubbleId})

//thunk creator 

export const fetchOneBubble = (bubbleId) => {
  return function thunk(dispatch) {
  	return axios.get(`/api/bubbles/${bubbleId}`)
  	.then( res => dispatch(getOneBubble(res.data)))
  	.catch((error) => { console.log(error); });
  };
}

export const makeNewFirstBubble = (bubble) => {
  return function thunk(dispatch) {
   return axios.post(`/api/bubbles/new-bubble`, bubble)
   .then( res => dispatch(newFirstBubble(res.data)))
   .catch((error) => { console.log(error); });
  }
}

//look at some examples of THUNK PUTS -- slydv change slide 
export const updateOneBubble = (bubbleId, bubble) => {
  return function thunk(dispatch) {
    return axios.put(`/api/bubbles/${bubbleId}`,bubble)
    .then( res => dispatch(updateBubble(res.data)))
    .catch((error) => { console.log(error); });
  }
}
//reducer 

export default function (state = oneBubble, action) {
  switch(action.type) {
  	case GET_ONE_BUBBLE:
  	 return action.bubble
    case NEW_FIRST_BUBBLE: 
      return action.bubble
  	default: 
  	 return state
  }
}