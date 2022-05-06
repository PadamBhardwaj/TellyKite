import { RESELLER_FAIL, RESELLER_REQUEST, RESELLER_SUCCESS, CLEAR_ERRORS, LOAD_RESELLER_FAIL, LOAD_RESELLER_REQUEST, LOAD_RESELLER_SUCCESS, LOGOUT_RESELLER_FAIL, LOGOUT_RESELLER_SUCCESS } from "../constants/resellerconstants"
import axios from "axios";
export const resellerLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: RESELLER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('http://localhost:4000/api/reseller/login', { email, password }, config);
        dispatch({ type: RESELLER_SUCCESS, payload: data.user })
        console.log(data);
    } catch (error) {
        dispatch({
            type: RESELLER_FAIL,
            payload: error
        })
    }
}
export const resellerLogout = () => async (dispatch) => {
    try {
        await axios.get(`http://localhost:4000/api/reseller/logout`);

        dispatch({ type: LOGOUT_RESELLER_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_RESELLER_FAIL, payload: error.response.data.message });
    }

};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}