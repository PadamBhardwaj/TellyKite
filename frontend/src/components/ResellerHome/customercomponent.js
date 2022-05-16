import React from 'react'
import Styles from "./customercomponent.module.css"
export const Customer = (props) => {
    return (<>
        <div className={Styles.Customer}>
            <p>{props.num + 1}. Name: {props.name}</p>
            <p>Email: {props.email}</p>
        </div>
        <hr />
    </>

    )
}
