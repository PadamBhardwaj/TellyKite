import React, { useEffect, useState } from 'react'
import Styles from "./customercreate.module.css"
// import Form from '../form'
import { useDispatch, useSelector } from "react-redux"
import { createCustomer } from "../../../actions/customeraction"

export const CustomerCreate = ({ history }) => {
    const dispatch = useDispatch()
    const { admin, isAuthenticatedAdmin, errorAdmin, role } = useSelector(state => state.admin);
    useEffect(() => {

        if (isAuthenticatedAdmin === false) {
            console.log("create form returning")
            history.push("/");
        }
    }, [isAuthenticatedAdmin]);

    let initialValue = {
        username: "",
        password: "",
        email: "",
        company: "",
        address: "",
        website: "",
        location: "",
        cellno: "",
        telephone: "",
        plan_type: "",
        Telly_version: "",
        mode: "independent"
    }
    const [val, setVal] = useState(initialValue)


    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value })
    }
    function handleClick(e) {
        e.preventDefault();
        dispatch(createCustomer(val));
        // alert.success("Reseller Created")
        history.push("/admin");

    }


    return (
        <>
            <div className={Styles.Container}>
                <form className={Styles.Form}>
                    <input onChange={handleChange} name="username" value={val.username} placeholder='Username' className={Styles.Input} />
                    <input onChange={handleChange} name="password" type="password" value={val.password} placeholder='Password' className={Styles.Input} />
                    <input onChange={handleChange} name="email" value={val.email} placeholder='Email' className={Styles.Input} />
                    <input onChange={handleChange} name="company" value={val.company} placeholder='Company Name' className={Styles.Input} />
                    <input onChange={handleChange} name="address" value={val.address} placeholder='Address' className={Styles.Input} />
                    <input onChange={handleChange} name="website" value={val.website} placeholder='Website' className={Styles.Input} />
                    <input onChange={handleChange} name="location" value={val.location} placeholder='Location' className={Styles.Input} />
                    <input onChange={handleChange} name="cellno" value={val.cellno} placeholder='Cell No' className={Styles.Input} />
                    <input onChange={handleChange} name="telephone" value={val.telephone} placeholder='Telephone Number' className={Styles.Input} />
                    <input onChange={handleChange} name="plan_type" value={val.plan_type} placeholder='Plan Type' className={Styles.Input} />
                    <input onChange={handleChange} name="Telly_version" value={val.Telly_version} placeholder='Telly Version' className={Styles.Input} />
                    <button type="submit" onClick={handleClick} className={Styles.Button} >Submit</button>
                </form>
            </div>
        </>
    )
}
