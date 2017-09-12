import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import allOceans from './allOceans'
import singleOcean from './singleOcean'
import oceanBubbles from './oceanBubbles'

const reducer = combineReducers({user, allOceans, singleOcean, oceanBubbles})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allOceans'
