import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Styles from "./adminhome.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faCirclePlus, faP, faPen, faPencil } from "@fortawesome/free-solid-svg-icons"
import { getResellers, logoutAdmin, getCustomers, getTopResellers } from "../../actions/adminaction"
// import { faCircleCheck, faCirclePlay } from "@fortawesome/free-regular-svg-icons"

import { useDispatch, useSelector } from "react-redux"
import { Topreseller } from './Topreseller'
export const Admin = ({ history }) => {
    const dispatch = useDispatch()
    const { admin, isAuthenticatedAdmin, errorAdmin, role }
        // customerCount,
        // directCustomerCount,
        // nonDirectCustomerCount } 
        = useSelector(state => state.admin);
    const r = admin.resellerCount
    const c = admin.customerCount
    const d = admin.directCustomerCount
    const n = admin.nonDirectCustomerCount
    const { topResellers } = useSelector(state => state.topResellers);
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
        // setarr(topResellers)
        // setarr(topResellers)
    }, [isAuthenticatedAdmin, getCustomers, getResellers, dispatch]);
    function handleClick() {
        dispatch(logoutAdmin());
        window.location = "/"; // THIS works

        // console.log("logged out")
        // console.log(isAuthenticatedAdmin);
        // history.push('/');
    }
    // const [arr, setarr] = useState([]);

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
                    <button onClick={handleClick} className="btn btn-primary">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className={Styles.Font} />
                        Logout
                    </button>
                </div>
            </div>
            <div className={Styles.Coltwo}>
                <div className={Styles.Data}>
                    <h5>Total Resellers : {r}</h5>
                    <h5>Direct Customers : {d}</h5>
                    <h5>Non-Direct Customers : {n}</h5>
                    <h5>Total Customers : {c}</h5>
                </div>
                <div className={Styles.Ranks}>
                    <h4>Top Resellers</h4>
                    <hr></hr>
                    {topResellers && topResellers.map((reseller, index) => <Topreseller num={index} key={reseller.id} name={reseller.username} customerCount={reseller.customerCount} />)}

                    {/* {resellers.map(reseller => <ResellerComponent name={reseller.name} username={reseller.username} />)} */}

                </div>
            </div>
        </>
    )
}
