import React, { useEffect, useState } from "react"
import { Navigate, Redirect, useNavigate } from 'react-router-dom'
import Styles from './Login.module.css'
// import Heading from "./Heading"

import { Link } from "react-router-dom";
import store from "../../store";
import { useDispatch, useSelector, Provider } from "react-redux"
// import { useAlert } from "react-alert";
import { adminLogin, clearErrors, loadAdmin, loginAdmin } from "../../actions/adminaction"
// import { clearErrors, loadReseller, loginReseller } from "../../actions/reselleraction.js"
import "../../App.css";
import axios from "axios";
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

    const { admin, isAuthenticatedAdmin, errorAdmin } = useSelector(state => state.admin);
    // const { reseller, isAuthenticatedReseller, errorReseller } = useSelector(state => state.reseller);

    // useEffect(() => {
    //     if (error) {
    //         alert.error("Invalid Email or Password")
    //         dispatch(clearErrors())
    //     }
    //     if ((isAuthenticatedAdmin === true)) {
    //         history.push("/admin")
    //     }
    //     if ((isAuthenticatedReseller === true)) {
    //         history.push("/reseller")
    //     }

    //     if ((isAuthenticatedCustomer === true)) {
    //         history.push("/customer")
    //     }
    // }, [isAuthenticatedAdmin, /*isAuthenticatedCustomer*/ isAuthenticatedReseller, history, admin, reseller, /*customer*/,/* error*/, dispatch, clearErrors])

    const handleClick = async (e) => {

        e.preventDefault();
        if (!val.email || !val.password) {

            return <Redirect to={'/'} />
        }


        // const data = await fetch('http://localhost:4000/api/check/' + val.email);


        // console.log(data);
        dispatch(adminLogin(val.email, val.password));
        if (isAuthenticatedAdmin) {
            // alert.success("Login Successful")
            console.log("admin logged in")
            return <Redirect to={'google.com'} />
        }

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



                    <button onClick={handleClick} className="submitbtn btn btn-success" type="submit">Submit</button>


                </form>

            </div>
        </div>
        <div className={Styles.Image}>

        </div>

    </>)
}

export default Login;
