import {
    LOAD_CUSTOMER_FAIL,
    LOAD_CUSTOMER_REQUEST,
    LOAD_CUSTOMER_SUCCESS,
    LOGOUT_CUSTOMER_FAIL,
    LOGOUT_CUSTOMER_SUCCESS,
    CLEAR_ERRORS,
    CUSTOMER_FAIL,
    CUSTOMER_REQUEST,
    CUSTOMER_SUCCESS

}
    from "../constants/customerconstants"
import axios from "axios";
export const customerLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: CUSTOMER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('http://localhost:4000/api/customer/login', { email, password }, config);
        dispatch({ type: CUSTOMER_SUCCESS, payload: data.user })
        console.log(data);
    } catch (error) {
        dispatch({
            type: CUSTOMER_FAIL,
            payload: error
        })
    }
}
export const customerLogout = () => async (dispatch) => {
    try {
        await axios.get(`http://localhost:4000/api/customer/logout`);

        dispatch({ type: LOGOUT_CUSTOMER_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_CUSTOMER_FAIL, payload: error.response.data.message });
    }

};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}