import {
    SET_USERS,
    SET_INITIAL_USERS,
    SET_USERS_FILTER_NAME,
    SET_USERS_FILTER_SELECT_FITNESS_CENTER,
    USERS_RESET_FILTER
} from "../actions/types"

const initialState = {
    users: [],
    initial_users: [],
    filter_select_fitness_center: "",
    filter_name: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case SET_INITIAL_USERS:
            return {
                ...state,
                initial_users: action.payload
            };
        case SET_USERS_FILTER_NAME:
            return {
                ...state,
                filter_name: action.payload
            };
        case SET_USERS_FILTER_SELECT_FITNESS_CENTER:
            return {
                ...state,
                filter_select_fitness_center: action.payload
            };
        case USERS_RESET_FILTER:
            return {
                ...state,
                filter_select_fitness_center: "",
                filter_name: ""
            };
        default:
            return state;
    }
}