import {
    RESELLER_FAIL,
    RESELLER_REQUEST,
    RESELLER_SUCCESS,
    LOAD_RESELLER_FAIL,
    LOAD_RESELLER_REQUEST,
    LOAD_RESELLER_SUCCESS,
    LOGOUT_RESELLER_FAIL,
    LOGOUT_RESELLER_SUCCESS,
    CLEAR_ERRORS
} from "../constants/resellerconstants";
export const resellerReducer = (state = { reseller: {} }, action) => {
    switch (action.type) {
        case RESELLER_REQUEST:
        case LOAD_RESELLER_REQUEST:
            return {
                loadingReseller: true,
                isAuthenticatedReseller: false
            }

        case RESELLER_SUCCESS:
        case LOAD_RESELLER_SUCCESS:
            return {
                ...state,
                loadingReseller: false,
                isAuthenticatedReseller: true,
                reseller: action.payload
            }

        case RESELLER_FAIL:
            return {
                ...state,
                loadingReseller: false,
                reseller: null,
                isAuthenticatedReseller: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case LOAD_RESELLER_FAIL:
            return {
                loadingReseller: false,
                reseller: null,
                isAuthenticatedReseller: false,
                error: action.payload
            }
        case LOGOUT_RESELLER_SUCCESS:
            return {
                loadingReseller: false,
                isAuthenticatedReseller: false,
                reseller: null
            }
        default:
            return state;
    }
}
