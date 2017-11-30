import axios from 'axios';

//action types

const ADD_NEW_BLOCKED_USER = 'ADD_NEW_BLOCKED_USER';
const CLEAR_BLOCK_LIST = 'CLEAR_BLOCK_LIST';

//initial state 

const newlyBlockedUsers = []

//action creators 

const addNewBlockedUser = (blockee) => ({type: ADD_NEW_BLOCKED_USER, blockee})
const clearBlockList = () => ({type:CLEAR_BLOCK_LIST})

//thunk creators

export const blockUser = (blockMatch, blockee) => {
  return function thunk(dispatch) {
  	return axios.post('/api/users/blockMatch', blockMatch)
  	.then((res) => {
  	  dispatch(addNewBlockedUser(blockee));
  	})
  	.catch((error) => { console.log(error); })
  }
}

//do later
//export const deleteBlockList =

//reducer

export default function (state = newlyBlockedUsers, action) {
  switch(action.type) {
  	default:
  	  return state;
  }
}