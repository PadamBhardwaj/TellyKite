import {
    ADMIN_FAIL,
    ADMIN_REQUEST,
    ADMIN_SUCCESS,
    LOAD_ADMIN_FAIL,
    LOAD_ADMIN_REQUEST,
    LOAD_ADMIN_SUCCESS,
    LOGOUT_ADMIN_FAIL,
    LOGOUT_ADMIN_SUCCESS,
    CLEAR_ERRORS
} from "../constants/adminconstants";
export const adminReducer = (state = { client: {} }, action) => {
    switch (action.type) {
        case ADMIN_REQUEST:
        case LOAD_ADMIN_REQUEST:
            return {
                loading: true,
                isAuthenticatedAdmin: false
            }

        case ADMIN_SUCCESS:
        case LOAD_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticatedAdmin: true,
                admin: action.payload
            }

        case ADMIN_FAIL:
            return {
                ...state,
                loading: false,
                admin: null,
                isAuthenticatedAdmin: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case LOAD_ADMIN_FAIL:
            return {
                loading: false,
                admin: null,
                isAuthenticatedAdmin: false,
                error: action.payload
            }
        case LOGOUT_ADMIN_SUCCESS:
            return {
                loading: false,
                isAuthenticatedAdmin: false,
                admin: null
            }
        default:
            return state;
    }
}
