import axios from 'axios';
import history from '../history';

//action types

const GET_ONE_BUBBLE = 'GET_ONE_BUBBLE'

//initial state

const oneBubble = {}

//action creator 

const getOneBubble = (bubble) => ({type: GET_ONE_BUBBLE, bubble})

//thunk creator 

export const fetchOneBubble = (bubbleId) => {
  return function thunk(dispatch) {
  	return axios.get(`/api/bubbles/${bubbleId}`)
  	.then( res => dispatch(getOneBubble(res.data)))
  	.catch((error) => { console.log(error); });
  };
}

//reducer 

export default function (state = oneBubble, action) {
  switch(action.type) {
  	case GET_ONE_BUBBLE:
  	 return action.bubble
  	default: 
  	 return state
  }
}