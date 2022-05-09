import './App.css';
import React from 'react';
import Login from './components/LoginPage/Login';
import Form from './components/Forms/form'
import Loading from './components/Layout/Loading';
import { Admin } from './components/AdminHome/adminhome';
import { Reseller } from './components/ResellerHome/resellerhome';
import { Customer } from './components/CustomerHome/customerhome'
import { useDispatch, useSelector } from "react-redux"
import ProtectedRouteAdmin from "./components/ProtectdRoutes/adminprotectedroute"
// import { Provider } from "react-redux"
// import { useSelector } from 'react-redux';
// import store from './store';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ResellerCreate } from './components/Forms/ResellerCreate/resellerform';
import { CustomerCreate } from './components/Forms/customercreate/customercreate';


function App({ history }) {

  const { admin, isAuthenticatedAdmin, loadingAdmin, errorAdmin, role } = useSelector(state => state.admin);
  const { reseller, isAuthenticatedReseller, errorReseller, loadingReseller } = useSelector(state => state.reseller);
  const { customer, isAuthenticatedCustomer, errorCustomer, loadingCustomer } = useSelector(state => state.customer);

  return (
    <>
      {/* <Provider store={store}> */}
      <Router>
        <Switch>

          {/* <Login /> */}
          <Route exact path='/' component={Login} />
          <Route path="/admin" component={(isAuthenticatedAdmin === true) && Admin} />
          <Route exact path='/reseller' component={(isAuthenticatedReseller === true) && Reseller} />
          <Route exact path='/customer' component={(isAuthenticatedCustomer === true) && Customer} />
          {/* <Route exact path='/logout' component={Customer} /> */}
          <Route exact path='/createreseller' component={(isAuthenticatedAdmin === true) && ResellerCreate} />
          <Route exact path='/createcustomer' component={(isAuthenticatedAdmin === true) && CustomerCreate} />
        </Switch>

      </Router>
      {/* </Provider> */}
    </>
  );
}

export default App;
