import { toast } from 'react-toastify';
import * as type from '../constants/actionType';

const initialState = {}

const offerReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_OFFER_EXCHANGE_SUCCESS: {
            return action.payload;
        }
        case type.FETCH_OFFER_EXCHANGE_FAILED: {
            return action.payload;
        }
        default: {
            return {...state}
        }
    }
}

export default offerReducer;