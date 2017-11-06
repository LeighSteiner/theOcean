import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import allOceans from './allOceans'
import singleOcean from './singleOcean'
import oceanBubbles from './oceanBubbles'
import singleBubble from './singleBubble'
import bubbleSuitors from './bubbleSuitors'
import singleBrook from './singleBrook'
import userMessageList from './userMessageList';
import brookBubbles from './brookBubbles'
import userHeadBubbles from './userHeadBubbles';

const reducer = combineReducers({
	user, 
	allOceans, 
	singleOcean, 
	oceanBubbles, 
	singleBubble, 
	bubbleSuitors, 
	singleBrook,
	brookBubbles, 
	userHeadBubbles
})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allOceans'
export * from './singleOcean'
export * from './oceanBubbles'
export * from './singleBubble'
export * from './bubbleSuitors'
export * from './singleBrook.js'
export * from './userMessageList'
export * from './brookBubbles'
export * from './userHeadBubbles'