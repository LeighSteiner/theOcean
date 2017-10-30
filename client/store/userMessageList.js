import axios from 'axios';
import history from '../history';

//action types
const GET_USER_MESSAGE_LIST = 'GET_USER_MESSAGE_LIST';
//initial state

const userMessageList = []
//action creators
const getUserMessageList = (messages) => ({type: GET_USER_MESSAGE_LIST, messages})
//thunk creators
export const fetchUserMessageList = () => {
  return function thunk(dispatch) {
  	return axios.get(`/api/`)  //write server route for messages
  	.then(res => dispatch(getUserMessageList(res.data)))
  	.catch((error) => { console.log(error); });
  }
}

//reducer

export default function (state = userMessageList, action) {
  switch(action.type) {
  	case GET_USER_MESSAGE_LIST:
  	  return action.messages;
  	default:
  	  return state;
  }
}