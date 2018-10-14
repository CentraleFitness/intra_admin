import {
    SET_MANAGERS,
    SET_INITIAL_MANAGERS,
    SET_MANAGER_ACTIVITY,
    SET_VALIDATE_MANAGER,
    SET_FITNESS_CENTERS,
    SET_MANAGERS_FILTER_NAME,
    SET_MANAGERS_FILTER_FITNESS_CENTER,
    DISPLAY_MANAGERS_UPDATE_CONFIRM,
    DISMISS_MANAGERS_UPDATE_CONFIRM
} from "../actions/types"

const initialState = {
    managers: [],
    initial_managers: [],
    fitness_centers: [],
    filter_name: "",
    filter_fitness_center: {},
    show_update_confirm: false,
    update_confirm_title: "",
    update_confirm_text: "",
    update_confirm_is_validation: false,
    update_confirm_id: "",
    update_confirm_name: "",
    update_confirm_is_active: false,
    update_confirm_is_validated: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MANAGERS:
            return {
                ...state,
                managers: action.payload
            };
        case SET_INITIAL_MANAGERS:
            return {
                ...state,
                initial_managers: action.payload
            };
        case SET_MANAGER_ACTIVITY:

            let tmp_manager_activity_update = state.initial_managers;
            let index = tmp_manager_activity_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });
            if (index !== -1) {
                tmp_manager_activity_update[index].is_active = action.payload.is_active;
                tmp_manager_activity_update[index].last_update_activity = action.payload.time;
                tmp_manager_activity_update[index].last_update_admin_id = action.payload.last_update_admin_id;
                tmp_manager_activity_update[index].last_update_admin_name = action.payload.last_update_admin_name;
            }
            return {
                ...state,
                initial_managers: tmp_manager_activity_update,
                managers: tmp_manager_activity_update
            };
        case SET_VALIDATE_MANAGER:

            let tmp_manager_validation_update = state.initial_managers;
            let index_val = tmp_manager_validation_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });
            if (index_val !== -1) {
                if (action.payload.is_validated === true) {
                    tmp_manager_validation_update[index_val].is_active = true;
                    tmp_manager_validation_update[index_val].is_validated = true;
                    tmp_manager_validation_update[index_val].is_refused = false;

                    tmp_manager_validation_update[index_val].last_update_activity = action.payload.time;
                    tmp_manager_validation_update[index_val].last_update_admin_id = action.payload.validator_admin_id;
                    tmp_manager_validation_update[index_val].last_update_admin_name = action.payload.validator_admin_name;
                } else {
                    tmp_manager_validation_update[index_val].is_active = false;
                    tmp_manager_validation_update[index_val].is_validated = false;
                    tmp_manager_validation_update[index_val].is_refused = true;
                }
                tmp_manager_validation_update[index_val].validation_date = action.payload.time;
                tmp_manager_validation_update[index_val].validator_admin_id = action.payload.validator_admin_id;
                tmp_manager_validation_update[index_val].validator_admin_name = action.payload.validator_admin_name;


            }
            return {
                ...state,
                initial_managers: tmp_manager_validation_update,
                managers: tmp_manager_validation_update
            };
        case SET_FITNESS_CENTERS:
            return {
                ...state,
                fitness_centers: action.payload
            };
        case SET_MANAGERS_FILTER_NAME:
            return {
                ...state,
                filter_name: action.payload
            };
        case SET_MANAGERS_FILTER_FITNESS_CENTER:
            return {
                ...state,
                filter_fitness_center: action.payload
            };
        case DISPLAY_MANAGERS_UPDATE_CONFIRM:
            return {
                ...state,
                show_update_confirm: true,
                update_confirm_title: action.payload.update_confirm_title,
                update_confirm_text: action.payload.update_confirm_text,
                update_confirm_is_validation: action.payload.update_confirm_is_validation,
                update_confirm_id: action.payload.update_confirm_id,
                update_confirm_name: action.payload.update_confirm_name,
                update_confirm_is_active: action.payload.update_confirm_is_active,
                update_confirm_is_validated: action.payload.update_confirm_is_validated
            };
        case DISMISS_MANAGERS_UPDATE_CONFIRM:
            return {
                ...state,
                show_update_confirm: false,
                update_confirm_title: "",
                update_confirm_text: "",
                update_confirm_is_validation: false,
                update_confirm_id: "",
                update_confirm_name: "",
                update_confirm_is_active: false,
                update_confirm_is_validated: false
            };
        default:
            return state;
    }
}