import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Styles from "./adminhome.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faCirclePlus, faP, faPen, faPencil } from "@fortawesome/free-solid-svg-icons"
import { getResellers, logoutAdmin, getCustomers } from "../../actions/adminaction"
// import { faCircleCheck, faCirclePlay } from "@fortawesome/free-regular-svg-icons"

import { useDispatch, useSelector } from "react-redux"
export const Admin = ({ history }) => {
    const dispatch = useDispatch()
    const { admin, isAuthenticatedAdmin, errorAdmin, role } = useSelector(state => state.admin);
    // if (!admin) {
    //     window.location.reload();

    // }
    useEffect(() => {

        if (isAuthenticatedAdmin === false) {
            console.log("admin home returning")
            history.push("/");
        }
        dispatch(getResellers());
        dispatch(getCustomers());

    }, [isAuthenticatedAdmin, getCustomers, getResellers, dispatch]);
    function handleClick() {
        dispatch(logoutAdmin());
        window.location = "/"; // THIS works

        // console.log("logged out")
        // console.log(isAuthenticatedAdmin);
        // history.push('/');
    }
    return (
        <>
            <div className={Styles.Links}>
                <div className={Styles.Link}>
                    <Link to={'/createreseller'} className={Styles.Text}>
                        <FontAwesomeIcon icon={faCirclePlus} className={Styles.Font} />
                        Reseller
                    </Link>
                </div>
                <div className={Styles.Link}>
                    <Link to={'/createcustomer'} className={Styles.Text}>
                        <FontAwesomeIcon icon={faCirclePlus} className={Styles.Font} />
                        Customer
                    </Link>
                </div>
                <div className={Styles.Link}>
                    <Link to={'/editreseller'} className={Styles.Text}>
                        <FontAwesomeIcon icon={faPencil} className={Styles.Font} />
                        Reseller
                    </Link>
                </div>
                <div className={Styles.Link}>
                    <Link to={'/editcustomer'} className={Styles.Text}>
                        <FontAwesomeIcon icon={faPencil} className={Styles.Font} />
                        Customer
                    </Link>
                </div>
                <div className={Styles.Link}>
                    <button onClick={handleClick} className={Styles.Text}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className={Styles.Font} />
                        Logout
                    </button>
                </div>
            </div>

        </>
    )
}
