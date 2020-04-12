import { createStore, combineReducers, applyMiddleware } from 'redux'
import userAuthReducer from '../reducers/UserauthReducer'
import thunk from 'redux-thunk'
const AllReducers = combineReducers({ user: userAuthReducer })
// const configureStore = () => {
//     const store = createStore(AllReducers, applyMiddleware(thunk))
//     return store
// }
const configureStore = createStore(AllReducers, applyMiddleware(thunk))
export default configureStore