import React, { useEffect, useState } from "react"
import { Navigate, Redirect, useNavigate } from 'react-router-dom'
import Styles from './Home.module.css'
import Heading from "./Heading"

import { Link } from "react-router-dom";
import store from "../../store";
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";
import { clearErrors, loadAdmin, loginAdmin } from "../../actions/adminaction"
import { clearErrors, loadReseller, loginReseller } from "../../actions/reselleraction.js"
import "../../App.css";
function Login({ history }) {

    const alert = useAlert();

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
    const { reseller, isAuthenticatedReseller, errorReseller } = useSelector(state => state.reseller);

    useEffect(() => {
        if (error) {
            alert.error("Invalid Email or Password")
            dispatch(clearErrors())
        }
        if ((isAuthenticatedAdmin === true)) {
            history.push("/admin")
        }
        if ((isAuthenticatedReseller === true)) {
            history.push("/reseller")
        }

        if ((isAuthenticatedCustomer === true)) {
            history.push("/customer")
        }
    }, [isAuthenticatedAdmin, isAuthenticatedCustomer, isAuthenticatedReseller, history, admin, reseller, customer, error, dispatch, clearErrors])

    const handleClick = (e) => {

        e.preventDefault();

        if (!val.email || !val.password) {
            return <Redirect to={'/'} />
        }

        // dispatch(login(val.email, val.password));
        // if (isAuthenticated) {
        //     alert.success("Login Successful")
        // }

    }

    return (<>
        <div className={Styles.BigContainer}>
            <Heading />
            <form className={Styles.Container}>


                <input className={Styles.Input} type="email" placeholder="Email" name="email" value={val.email} onChange={handleChange} />


                <input className={Styles.Input} type="password" autoComplete="true" placeholder="Password" name="password" value={val.password} onChange={handleChange} />



                <button onClick={handleClick} className="submitbtn btn btn-success" type="submit">Submit</button>


            </form>


        </div>

    </>)
}

export default Login;
