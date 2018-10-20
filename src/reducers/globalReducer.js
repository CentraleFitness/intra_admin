import {
    DISPLAY_ALERT,
    DISMISS_ALERT,

    SET_ADMINISTRATORS_IS_LOAD,
    SET_USERS_FEEDBACKS_IS_LOAD,
    SET_MANAGERS_FEEDBACKS_IS_LOAD,
    SET_MANAGERS_IS_LOAD,
    SET_FITNESS_CENTERS_IS_LOAD,
    SET_MODULES_IS_LOAD,
    SET_MODULE_STATES_IS_LOAD,

    SET_ADMINISTRATORS_IS_NOT_LOAD,
    SET_USERS_FEEDBACKS_IS_NOT_LOAD,
    SET_MANAGERS_FEEDBACKS_IS_NOT_LOAD,
    SET_MANAGERS_IS_NOT_LOAD,
    SET_FITNESS_CENTERS_IS_NOT_LOAD,
    SET_MODULES_IS_NOT_LOAD,
    SET_MODULE_STATES_IS_NOT_LOAD

} from "../actions/types"

const initialState = {
    showAlert: false,
    alertTitle: "",
    alertText: "",

    administrators_is_load: false,
    users_feedbacks_is_load: false,
    managers_feedbacks_is_load: false,
    managers_is_load: false,
    fitness_centers_is_load: false,
    modules_is_load: false,
    module_states_is_load: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertTitle: action.payload.alertTitle,
                alertText: action.payload.alertText
            };
        case DISMISS_ALERT:
            return {
                ...state,
                showAlert: false,
                alertTitle: "",
                alertText: ""
            };
        case SET_ADMINISTRATORS_IS_LOAD:
            return {
                ...state,
                administrators_is_load: true
            };
        case SET_USERS_FEEDBACKS_IS_LOAD:
            return {
                ...state,
                users_feedbacks_is_load: true
            };
        case SET_MANAGERS_FEEDBACKS_IS_LOAD:
            return {
                ...state,
                managers_feedbacks_is_load: true
            };
        case SET_MANAGERS_IS_LOAD:
            return {
                ...state,
                managers_is_load: true
            };
        case SET_FITNESS_CENTERS_IS_LOAD:
            return {
                ...state,
                fitness_centers_is_load: true
            };
        case SET_MODULES_IS_LOAD:
            return {
                ...state,
                modules_is_load: true
            };
        case SET_MODULE_STATES_IS_LOAD:
            return {
                ...state,
                module_states_is_load: true
            };


        case SET_ADMINISTRATORS_IS_NOT_LOAD:
            return {
                ...state,
                administrators_is_load: false
            };
        case SET_USERS_FEEDBACKS_IS_NOT_LOAD:
            return {
                ...state,
                users_feedbacks_is_load: false
            };
        case SET_MANAGERS_FEEDBACKS_IS_NOT_LOAD:
            return {
                ...state,
                managers_feedbacks_is_load: false
            };
        case SET_MANAGERS_IS_NOT_LOAD:
            return {
                ...state,
                managers_is_load: false
            };
        case SET_FITNESS_CENTERS_IS_NOT_LOAD:
            return {
                ...state,
                fitness_centers_is_load: false
            };
        case SET_MODULES_IS_NOT_LOAD:
            return {
                ...state,
                modules_is_load: false
            };
        case SET_MODULE_STATES_IS_NOT_LOAD:
            return {
                ...state,
                module_states_is_load: false
            };
        default:
            return state;
    }
}