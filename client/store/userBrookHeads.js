import axios from 'axios';

//action types

const GET_USER_BROOK_HEADS = 'GET_USER_BROOK_HEADS'

//initial state

const userBrookHeads = []

//action creators 

const getUserBrookHeads = (brookHeads) =>  ({type: GET_USER_BROOK_HEADS, brookHeads})


//thunk creators 

export const fetchUserBrookHeads = (userId) => {
  return function thunk(dispatch) {
  	return axios.get(`/api/bubbles/brook-heads/${userId}`)
  	.then((res) => dispatch (getUserBrookHeads(res.data)))
  	.catch((error) => { console.log(error); })
  }
}

//reducer

export default function(state = userBrookHeads, action) {
  switch(action.type){
  	case GET_USER_BROOK_HEADS:
  	  return action.brookHeads
  	default:
  	  return state
  }
}