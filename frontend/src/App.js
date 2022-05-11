import './App.css';
import React, { useEffect } from 'react';
import Login from './components/LoginPage/Login';
import Allreseller from "./components/Edit Reseller/allreseller"
import Allcustomer from "./components/Edit customer/allcustomer"
// import Form from './components/Forms/form'
import Loading from './components/Layout/Loading';
import { Admin } from './components/AdminHome/adminhome';
import { Reseller } from './components/ResellerHome/resellerhome';
import { Customer } from './components/CustomerHome/customerhome'
import { useDispatch, useSelector } from "react-redux"
import Dummycomponent from './components/Dummy/Dummycomponent';
import ProtectedRouteAdmin from "./components/ProtectdRoutes/adminprotectedroute"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ResellerCreate } from './components/Forms/ResellerCreate/resellerform';
import { CustomerCreate } from './components/Forms/customercreate/customercreate';
import { clearErrors, loadAdmin } from "./actions/adminaction";
import { loadReseller } from './actions/reselleraction';
import { loadCustomer } from './actions/customeraction';
import EditReseller from './components/Forms/edit reseller form/edirresellerfomr';
import EditCustomer from './components/Forms/edit customer/editcustomer';
function App({ history }) {
  const dispatch = useDispatch();
  const { admin, isAuthenticatedAdmin, loadingAdmin, errorAdmin, role } = useSelector(state => state.admin);
  const { reseller, isAuthenticatedReseller, errorReseller, loadingReseller } = useSelector(state => state.reseller);
  const { customer, isAuthenticatedCustomer, errorCustomer, loadingCustomer } = useSelector(state => state.customer);
  useEffect(() => {
    dispatch(loadAdmin());
    dispatch(loadReseller());
    dispatch(loadCustomer());
  }, [])



  return (
    // (isAuthenticatedAdmin) ? <Dummycomponent /> : (
    <>

      <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/admin" component={(isAuthenticatedAdmin === true) && Admin} />
        <Route exact path='/reseller' component={(isAuthenticatedReseller === true) && Reseller} />
        <Route exact path='/customer' component={(isAuthenticatedCustomer === true) && Customer} />
        <Route exact path='/createreseller' component={(isAuthenticatedAdmin === true) && ResellerCreate} />
        <Route exact path='/createcustomer' component={(isAuthenticatedAdmin === true) && CustomerCreate} />
        <Route exact path='/editreseller' component={(isAuthenticatedAdmin === true) && Allreseller} />
        <Route exact path='/editresellerform' component={(isAuthenticatedAdmin === true) && EditReseller} />
        <Route exact path='/editcustomer' component={(isAuthenticatedAdmin === true) && Allcustomer} />
        <Route exact path='/editcustomerform' component={(isAuthenticatedAdmin === true) && EditCustomer} />
      </Switch>

    </>)
    // )
    ;
}

export default App;
