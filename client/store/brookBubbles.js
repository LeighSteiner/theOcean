import axios from 'axios';

//action types 

const GET_BROOK_BUBBLES = 'GET_BROOK_BUBBLES';
const GOT_NEW_BROOK_BUBBLE = 'GOT_NEW_BROOK_BUBBLE';
// const DELETED_BROOK_BUBBLE = 'DELETED_BROOK_BUBBLE'
// const MAKE_NEW_BROOK_BUBBLE = 'MAKE_NEW_BROOK_BUBBLE';

//initial state

const brookBubbles = []

//action creators 

const getBrookBubbles = (bubbles) => ({type: GET_BROOK_BUBBLES, bubbles})
const gotNewBrookBubble = (bubble) => ({type: GOT_NEW_BROOK_BUBBLE, bubble})
// const makeNewBrookBubble = (bubble) => ({ })
// const deletedBrookBubble = (bubble) => ({type: DELETED_BROOK_BUBBLE, bubble})

//thunk creators

export const fetchBrookBubbles = (brookId) => {
  return function thunk(dispatch) {
  	return axios.get(`/api/${brookId}/bubbles`)
  	.then( (res) => dispatch(getBrookBubbles(res.data)))
  	.catch((error) => { console.log(error); })
  }
}

//do add new bubble later -- like when you actually have a brookview
 export const moreBrookBubbles = (bubble) => {
  return function thunk(dispatch) {
    return axios.post('/new-bubble', bubble)
    .then( (res) => dispatch(gotNewBrookBubble(res.data)))
    .catch((error) => { console.log(error); })
  }
 }

//reducer 

export default function (state = brookBubbles, action) {
  switch(action.type) {
  	case GET_BROOK_BUBBLES:
  	  return action.bubbles;
  	case GOT_NEW_BROOK_BUBBLE:
  	  return [...state, action.bubble]
  	// case DELETED_BROOK_BUBBLE: 
  	//   let arr = state.slice(0, state.indexOf(action.bubble))
  	default:
  	 return state;
  }
}