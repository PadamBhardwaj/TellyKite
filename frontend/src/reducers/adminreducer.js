import {
    ADMIN_FAIL,
    ADMIN_REQUEST,
    ADMIN_SUCCESS,
    LOAD_ADMIN_FAIL,
    LOAD_ADMIN_REQUEST,
    LOAD_ADMIN_SUCCESS,
    LOGOUT_ADMIN_FAIL,
    LOGOUT_ADMIN_SUCCESS,
    CLEAR_ERRORS,
    LOAD_ROLE_REQUEST,
    LOAD_ROLE_SUCCESS
} from "../constants/adminconstants";
export const adminReducer = (state = { admin: {} }, action) => {
    switch (action.type) {
        case ADMIN_REQUEST:
        case LOAD_ADMIN_REQUEST:
            return {
                loadingAdmin: true,
                isAuthenticatedAdmin: false
            }

        case ADMIN_SUCCESS:
        case LOAD_ADMIN_SUCCESS:
            return {
                ...state,
                loadingAdmin: false,
                isAuthenticatedAdmin: true,
                admin: action.payload
            }
        // case LOAD_ROLE_REQUEST:
        //     return {
        //         loadingAdmin: true,
        //     }
        // case LOAD_ROLE_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         role: action.payload
        //     }
        case ADMIN_FAIL:
            return {
                ...state,
                loadingAdmin: false,
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
                loadingAdmin: false,
                admin: null,
                isAuthenticatedAdmin: false,
                error: action.payload
            }
        case LOGOUT_ADMIN_SUCCESS:
            return {
                loadingAdmin: false,
                isAuthenticatedAdmin: false,
                admin: null
            }
        case LOGOUT_ADMIN_FAIL:
            return {
                loadingAdmin: false,
                isAuthenticatedAdmin: false,
                admin: null
            }
        default:
            return state;
    }
}
