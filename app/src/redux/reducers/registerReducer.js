import initialState from '../initialState';
import { SUBMIT_REGISTRATION_REQUEST, REGISTER_FAILED, REGISTER_SUCCESS} from '../actions/registerAction';

export default function registerReducer(state = initialState.register,  action) {
    console.log(action.type);
    switch(action.type) {
        // case GET_TEAM_SELECTION:
        //     return Object.assign({}, state, {
        //         teams: action.payload,
        //     });
        case SUBMIT_REGISTRATION_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isFetching:false,
                message: 'success',
            }
        case REGISTER_FAILED:
            console.log('register failed here');
            return {
                ...state,
                isFetching: false,
                message: action.message,
            }
        default:
            return state;
    }
}