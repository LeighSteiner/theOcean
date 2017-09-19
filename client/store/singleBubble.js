import axios from 'axios';
import history from '../history';

//action types

const GET_ONE_BUBBLE = 'GET_ONE_BUBBLE'
const NEW_FIRST_BUBBLE = 'NEW_FIRST_BUBBLE'


//initial state

const oneBubble = {}

//action creator 

const getOneBubble = (bubble) => ({type: GET_ONE_BUBBLE, bubble})
const newFirstBubble = (bubble) => ({type: NEW_FIRST_BUBBLE, bubble})

//thunk creator 

export const fetchOneBubble = (bubbleId) => {
  return function thunk(dispatch) {
  	return axios.get(`/api/bubbles/${bubbleId}`)
  	.then( res => dispatch(getOneBubble(res.data)))
  	.catch((error) => { console.log(error); });
  };
}

export const newFirstBubble = (bubble) => {
  return function thunk(dispatch) {
    //first find ocean, or set default ocean = 1
    //oceans need to either have a name with no spaces, 
    //or a property that is the name with the spaces removed
    //then post new bubble
    return axios.get(`/api/oceans/${bubble.ocean}`)
    .then( oceanId => {
      //this is wrong. come back to it
      return axios.post(`/api/bubbles/new-bubble`)
    })
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