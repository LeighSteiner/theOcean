import axios from 'axios';

//action types

const GET_USER_HEAD_BUBBLES = 'GET_USER_HEAD_BUBBLES'

//initial state

const userHeadBubbles = []

//action creators 

const getUserHeadBubbles = (bubbles) =>  ({type: GET_USER_HEAD_BUBBLES, bubbles})


//thunk creators 

export const fetchUserHeadBubbles = (userId) => {
  return function thunk(dispatch) {
  	return axios.get(`/api/bubbles/head-bubbles/${userId}`)
  	.then((res) => dispatch(getUserHeadBubbles(res.data)))
  	.catch((error) => { console.log(error); })

  }
}

//reducer

export default function(state = userHeadBubbles, action) {
  switch(action.type){
  	case GET_USER_HEAD_BUBBLES:
  	  return action.bubbles
  	default:
  	  return state
  }
}