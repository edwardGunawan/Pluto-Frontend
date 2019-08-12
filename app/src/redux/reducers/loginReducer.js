import initialState from '../initialState';
export default function loginReducer(state=initialState.users,action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}