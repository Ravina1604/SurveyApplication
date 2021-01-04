import * as actionTypes from '../actions/constants';

const initialState = {
    isAuthenticated: false,
    loggedPublished: {},
    authError: ""
}
const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                loggedPublisher: action.payload.publisher,
                authError: ""
            }
        case actionTypes.SIGNUP:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                loggedPublisher: action.payload.publisher,
                authError: ""
            }
        case actionTypes.LOGOUT: 
            return {
                ...state,
                isAuthenticated: false,
                loggedPublisher: {},
                authError: ""
            }
        case actionTypes.AUTHERROR: 
            return {
                ...state,
                authError: action.payload.error
            }
        default:
            return state;
    }
    // return state;
}

export default authReducer;