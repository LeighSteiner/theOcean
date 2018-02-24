import axios from 'axios';
import history from '../history';

//action type

const GET_OCEAN_BUBBLES = 'GET_OCEAN_BUBBLES'

//initial state

const oceanBubbles = []

//action creator 

const getOceanBubbles = (bubbles) => ({type: GET_OCEAN_BUBBLES, bubbles})

//thunk creator 

export const fetchOceanBubbles = (oceanId) => {
  return function thunk(dispatch) {
  	return axios.get(`/api/oceans/ocean/${oceanId}/bubbles`)
  	.then ( res => {
      console.log('fetched ocean bubbles',res.data)
      dispatch(getOceanBubbles(res.data))
    })
  	.catch((error) => { console.log(error); });
  }
}

//reducer 

export default function (state = oceanBubbles, action) {
  switch(action.type) {
  	case GET_OCEAN_BUBBLES:
  	  return action.bubbles
  	default: 
  	  return state
  }
}