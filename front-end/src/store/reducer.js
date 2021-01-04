import * as actionTypes from './actions/constants';
// import * as authActions from './actions/authActions';
const initialState = {
    counter: 0,
    results: []
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                counter: 10
            }
    }
    return state;
}

export default reducer