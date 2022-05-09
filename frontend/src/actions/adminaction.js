import {
    ADMIN_FAIL, ADMIN_REQUEST, LOAD_ROLE_REQUEST, LOAD_ROLE_SUCCESS,
  
    ADMIN_SUCCESS, CLEAR_ERRORS, LOAD_ADMIN_FAIL, LOAD_ADMIN_REQUEST, LOAD_ADMIN_SUCCESS, LOGOUT_ADMIN_FAIL, LOGOUT_ADMIN_SUCCESS
} from "../constants/adminconstants"
import axios from "axios";
export const adminLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/api/admin/login', { email, password }, config);
        dispatch({ type: ADMIN_SUCCESS, payload: data.user })
        console.log(data);
    } catch (error) {
        dispatch({
            type: ADMIN_FAIL,
            payload: error
        })
    }
}
export const getrole = (email) => async (dispatch) => {
    try {
        dispatch({ type: LOAD_ROLE_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/api/check', { email }, config);
        dispatch({ type: LOAD_ROLE_SUCCESS, payload: data.role })
    } catch (error) {
        dispatch({
            type: ADMIN_FAIL,
            payload: error
        })
    }
}
export const logoutAdmin = () => async (dispatch) => {
    try {
        await axios.get(`/api/admin/logout`);

        dispatch({ type: LOGOUT_ADMIN_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_ADMIN_FAIL, payload: error.response.data.message });
    }

};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}