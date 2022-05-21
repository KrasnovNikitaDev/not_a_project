import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import * as reducers from './reducers.js';





const reducerStore = combineReducers(reducers)



export const store = createStore(
    reducerStore,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)