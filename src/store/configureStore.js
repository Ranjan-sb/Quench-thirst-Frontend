import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import requestsReducer from '../reducers/requests-reducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        requests: requestsReducer
    }), applyMiddleware(thunk))
    return store 
}

export default configureStore