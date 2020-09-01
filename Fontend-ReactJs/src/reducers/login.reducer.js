import * as type from '../constants/actionType';

const initialState = {
    accessToken: localStorage.getItem('accessToken') || ''
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_TOKEN_SUCESS: {
            state = {
                ...state,
                'accessToken': action.payload.accessToken
            }
            localStorage.setItem('accessToken', state.accessToken);
            return { ...state };
        }
        case type.FETCH_TOKEN_FAILED: {
            return { ...state };
        }
        case type.GET_TOKEN: {
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}

export default loginReducer;