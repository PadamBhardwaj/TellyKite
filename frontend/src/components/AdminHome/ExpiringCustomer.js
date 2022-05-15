import React from "react";
export const ExpiringCustomer = (props) => {
    return (
        <>

            <div>
                <p>{props.num + 1}. {props.name} : {props.Expiry}</p>
            </div>
        </>
    )
}