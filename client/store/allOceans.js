import axios from 'axios';
import history from '../history';

//action types

const GET_OCEANS = 'GET_OCEANS'

//intial state

const allOceans = []

//action creators

const getOceans = (oceans) => ({type: GET_OCEANS, oceans})

//thunk creators

export const fetchOceans = () => {
  return function thunk(dispatch) {
  	return axios.get(`/api/oceans`)
  	.then( res => dispatch(getOceans(res.data)))
  	.catch((error) => { console.log(error); });
  };
} 

//reducer

export default function (state = allOceans, action) {
  switch(action.type) {
  	case GET_OCEANS:
  	  return action.oceans
  	default:
  	  return state 
  }
}