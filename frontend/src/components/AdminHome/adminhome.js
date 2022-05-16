import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Styles from "./adminhome.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faCirclePlus, faP, faPen, faPencil, faPersonCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { getResellers, logoutAdmin, getCustomers, getTopResellers, getExpiryCustomers, total } from "../../actions/adminaction"
// import { faCircleCheck, faCirclePlay } from "@fortawesome/free-regular-svg-icons"
import { ExpiringCustomer } from './ExpiringCustomer'
import { useDispatch, useSelector } from "react-redux"
import { Topreseller } from './Topreseller'
// import { init } from 'express/lib/application'
export const Admin = ({ history }) => {
    const dispatch = useDispatch()
    const { admin, isAuthenticatedAdmin, errorAdmin }
        // customerCount,
        // directCustomerCount,
        // nonDirectCustomerCount } 
        = useSelector(state => state.admin);
    const { resellerCount, nonDirectCustomerCount, directCustomerCount, customerCount } = useSelector(state => state.total)
    // if (!admin) {
    //     window.location.reload();

    // }

    const { topResellers } = useSelector(state => state.topResellers);
    // const { resellerCount, nonDirectCustomerCount, directCustomerCount, customerCount } = total.total;
    const { expiringCustomers, loading } = useSelector(state => state.expiry)
    useEffect(() => {
        dispatch(total())
        dispatch(getTopResellers())
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
    const initialval = {
        day: 0
    }
    const [val, setVal] = useState(initialval);
    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value })
        // setVal()
    }
    function handleExpiry(e) {
        // e.preventDefault();
        const num = parseInt(val.day)
        const data = {
            days: num
        }
        dispatch(getExpiryCustomers(data));

    }
    // const [arr, setarr] = useState([]);

    const r = resellerCount
    const c = customerCount
    const d = directCustomerCount
    const n = nonDirectCustomerCount
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
                <div>
                    <p>Renews in:</p>
                    {/* <form> */}
                    <input name='day' value={val.day} onChange={handleChange} />
                    <button type='submit' onClick={handleExpiry}>Find</button>
                    {/* </form> */}
                    <div>
                        <h3>Customers:</h3>
                        {(!loading && expiringCustomers) &&
                            expiringCustomers.map((cust, index) => <ExpiringCustomer key={cust.id} num={index} name={cust.username} Expiry={cust.Expiry} />)}
                    </div>
                </div>
            </div>
        </>
    )
}
