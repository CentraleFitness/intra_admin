import {
    SET_ADMINISTRATORS,
    SET_ADMINISTRATORS_FILTER_NAME,
    SET_INITIAL_ADMINISTRATORS,
    DISPLAY_DELETE_USER_MODAL,
    DISMISS_DELETE_USER_MODAL

} from "../actions/types"

const initialState = {
    administrators: [],
    initial_administrators: [],
    filter_name: "",
    showDeleteConfirm: false,
    delete_first_name: "",
    delete_last_name: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMINISTRATORS:
            return {
                ...state,
                administrators: action.payload
            };
        case SET_INITIAL_ADMINISTRATORS:
            return {
                ...state,
                initial_administrators: action.payload
            };
        case SET_ADMINISTRATORS_FILTER_NAME:
            return {
                ...state,
                filter_name: action.payload
            };
        case DISPLAY_DELETE_USER_MODAL:
            return {
                ...state,
                showDeleteConfirm: true,
                delete_first_name: action.payload.first_name,
                delete_last_name: action.payload.last_name
            };
        case DISMISS_DELETE_USER_MODAL:
            return {
                ...state,
                showDeleteConfirm: false,
                delete_first_name: "",
                delete_last_name: ""
            };
        default:
            return state;
    }
}