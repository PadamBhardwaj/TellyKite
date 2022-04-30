import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const reducer = combineReducers({
    customers: customerReducer,
    client: clientReducer,
    clients: clientsReducer,
    orderdetail: orderdetailsReducer
})

let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store; 