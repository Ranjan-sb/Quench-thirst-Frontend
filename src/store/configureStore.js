import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import requestsReducer from '../reducers/requests-reducer'
import ordersReducer from '../reducers/orders-reducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        requests: requestsReducer,
        orders:ordersReducer
    }), applyMiddleware(thunk))
    return store 
}

export default configureStore