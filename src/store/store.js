import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { calendar_reducer } from './calendar_reducer.js';
import { user_reducer } from './user_reducer.js';




const reducerStore = combineReducers({
    calendar_reducer,
    user_reducer
})



export const store = createStore(
    reducerStore,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)