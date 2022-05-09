import React, { useEffect, useState } from "react"
import { Navigate, Redirect, useNavigate } from 'react-router-dom'
import Styles from './Login.module.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowRightArrowLeft, faArrowRightLong } from "@fortawesome/free-solid-svg-icons"
import store from "../../store";
import { useDispatch, useSelector, Provider } from "react-redux"
// import { useAlert } from "react-alert";
import { adminLogin, clearErrors } from "../../actions/adminaction"
import { resellerLogin, resellerLogout } from "../../actions/reselleraction"
import { customerLogin, customerLogout } from "../../actions/customeraction"
import "../../App.css";
function Login({ history }) {
    // const alert = useAlert();
    let initialValue = {
        email: '',
        password: ''
    }
    const [val, setVal] = useState(initialValue)
    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value })
    }
    const dispatch = useDispatch();
    const { admin, isAuthenticatedAdmin, errorAdmin, role, loadingAdmin } = useSelector(state => state.admin);
    const { reseller, isAuthenticatedReseller, errorReseller } = useSelector(state => state.reseller);
    const { customer, isAuthenticatedCustomer, errorCustomer } = useSelector(state => state.customer);
    useEffect(() => {
        if (errorAdmin) {
            alert.error("Invalid Email or Password")
            dispatch(clearErrors())
        }
        if ((isAuthenticatedAdmin === true)) {
            console.log("before push")
            history.push("/admin")
            console.log("after push")
            // console.log("admin success")
        }
        if ((isAuthenticatedReseller === true)) {
            history.push("/reseller")
            console.log("reseller success");
        }
        if ((isAuthenticatedCustomer === true)) {
            history.push("/customer")
            console.log("reseller success");
        }
    }, [isAuthenticatedAdmin, isAuthenticatedCustomer, isAuthenticatedReseller, history, admin, reseller, customer, errorAdmin, dispatch, clearErrors])
    const handleClick = async (e) => {
        e.preventDefault();
        if (!val.email || !val.password) {

            return <Redirect to={'/'} />
        }
        dispatch(adminLogin(val.email, val.password));
        // console.log("dispatched");
        dispatch(resellerLogin(val.email, val.password));
        dispatch(customerLogin(val.email, val.password));
        // if (isAuthenticatedAdmin) {
        //     // alert.success("Login Successful")
        //     console.log("admin logged in")
        //     history.push("/admin")

        // }
        // else if (isAuthenticatedReseller) {
        //     // alert.success("Login Successful")
        //     console.log("Reseller logged in")
        //     history.push("/reseller")

        // }
        // else if (isAuthenticatedCustomer) {
        //     // alert.success("Login Successful")
        //     console.log("Customer logged in")
        //     history.push("/customer")

        // }
    }

    return (<>
        <div className={Styles.Loginpage}>
            <div className={Styles.Box}>
                <h1 className={Styles.Heading}>
                    Login
                </h1>
                <form className={Styles.Container}>


                    <input className={Styles.Input} type="email" placeholder="Email" name="email" value={val.email} onChange={handleChange} />


                    <input className={Styles.Input} type="password" autoComplete="true" placeholder="Password" name="password" value={val.password} onChange={handleChange} />



                    <button onClick={handleClick} className={Styles.submitbtn} type="submit">Login   <FontAwesomeIcon icon={faArrowRightLong} /></button>


                </form>

            </div>
        </div>
        <div className={Styles.Image}>

        </div>

    </>)
}

export default Login;
