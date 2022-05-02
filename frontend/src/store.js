import { createStore, combineReducers, applyMiddleware } from "redux";
import { adminReducer } from "./reducers/adminreducer"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const reducer = combineReducers({
    // customers: customerReducer,
    admin: adminReducer,
    // clients: clientsReducer,
    // orderdetail: orderdetailsReducer
})

let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;   