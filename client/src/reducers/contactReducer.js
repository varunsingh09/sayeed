// contactReducer.js

import { CREATE_NEW_CONTACT } from '../actions/types/';

export default (state = [], action) => {
    switch (action.type) {

        case CREATE_NEW_CONTACT:
        console.log("---------",action.contact)
            return [
                ...state,
                Object.assign({}, action.contact)
            ];
        default:
            return state;
    }
};