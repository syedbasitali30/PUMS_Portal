import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
    loginReducer,
    stageReducer,
    uniInfoReducer,
    focusReducer,
    userDataReducer,
} from './reducers'

const middlewares = [thunk]

const reducers = combineReducers({
    loginReducer: loginReducer,
    focusReducer: focusReducer,
    stageReducer: stageReducer,
    uniInfoReducer: uniInfoReducer,
    userDataReducer: userDataReducer,
})

export const Store = createStore(reducers, applyMiddleware(...middlewares))
