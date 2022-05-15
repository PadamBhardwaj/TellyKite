import { createStore, combineReducers, applyMiddleware } from "redux";
import { adminReducer } from "./reducers/adminreducer"
import { resellersReducer } from "./reducers/adminreducer"
import { customersReducer } from "./reducers/adminreducer"
import { topResellersReducer } from "./reducers/adminreducer"
import { customerReducer } from './reducers/customerreducer'
import { resellerReducer } from "./reducers/resellerReducer"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const reducer = combineReducers({
    admin: adminReducer,
    resellers: resellersReducer,
    reseller: resellerReducer,
    customer: customerReducer,
    customers: customersReducer,
    topResellers: topResellersReducer
})

let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;   