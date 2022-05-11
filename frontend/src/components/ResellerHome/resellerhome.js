import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Styles from "./resellerhome.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faCirclePlus, faP, faPen, faPencil } from "@fortawesome/free-solid-svg-icons"
// import { getResellers, logoutAdmin, getCustomers } from "../../actions/adminaction"
import { resellerLogout } from "../../actions/reselleraction"
import { useDispatch, useSelector } from "react-redux"

export const Reseller = ({ history }) => {
    const dispatch = useDispatch()
    const { admin, isAuthenticatedAdmin, errorAdmin, role } = useSelector(state => state.admin);
    const { reseller, isAuthenticatedReseller, errorReseller } = useSelector(state => state.reseller);
    // if (!admin) {
    //     window.location.reload();

    // }
    useEffect(() => {

        if (isAuthenticatedReseller === false) {
            console.log("reseller home returning")
            history.push("/");
        }
        // dispatch(getResellers());
        // dispatch(getCustomers());

    }, [isAuthenticatedReseller, dispatch]);
    function handleClick() {
        dispatch(resellerLogout());
        window.location = "/"; // THIS works

        // console.log("logged out")
        // console.log(isAuthenticatedAdmin);
        // history.push('/');
    }
    return (
        <>
            <div>Reseller</div>
            <div className={Styles.Link}>
                <button onClick={handleClick} className={Styles.Text}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={Styles.Font} />
                    Logout
                </button>
            </div>
        </>
    )
}
