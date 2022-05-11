import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Styles from "./customerhome.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faCirclePlus, faP, faPen, faPencil } from "@fortawesome/free-solid-svg-icons"
import { customerLogout } from "../../actions/customeraction"
import { useDispatch, useSelector } from "react-redux"

export const Customer = ({ history }) => {
    const dispatch = useDispatch()
    // const { admin, isAuthenticatedAdmin, errorAdmin, role } = useSelector(state => state.admin);
    // const { reseller, isAuthenticatedReseller, errorReseller } = useSelector(state => state.reseller);
    const { customer, isAuthenticatedCustomer } = useSelector(state => state.customer);
    // if (!admin) {
    //     window.location.reload();

    // }
    useEffect(() => {

        if (isAuthenticatedCustomer === false) {
            console.log("customer home returning")
            history.push("/");
        }
        // dispatch(getResellers());
        // dispatch(getCustomers());

    }, [isAuthenticatedCustomer, dispatch]);
    function handleClick() {
        dispatch(customerLogout());
        window.location = "/"; // THIS works

        // console.log("logged out")
        // console.log(isAuthenticatedAdmin);
        // history.push('/');
    }
    return (
        <>
            <div>Customer</div>
            <div className={Styles.Link}>
                <button onClick={handleClick} className={Styles.Text} >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={Styles.Font} />
                    Logout
                </button>
            </div>
        </>
    )
}
