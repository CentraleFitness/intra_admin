import {
    SET_MANAGERS,
    SET_INITIAL_MANAGERS,
    SET_MANAGER_ACTIVITY,
    SET_VALIDATE_MANAGER,
    SET_UNDO_REFUSE_MANAGER,
    SET_FITNESS_CENTERS,

    SET_MANAGERS_FILTER_NAME,
    SET_MANAGERS_FILTER_SELECT_FITNESS_CENTER,
    MANAGERS_RESET_FILTER,

    DISPLAY_MANAGERS_UPDATE_CONFIRM,
    DISMISS_MANAGERS_UPDATE_CONFIRM,
    DISPLAY_MANAGERS_DETAILS_MODAL,
    DISMISS_MANAGERS_DETAILS_MODAL
} from "../actions/types"

const initialState = {
    managers: [],
    initial_managers: [],
    fitness_centers: [],

    filter_name: "",
    filter_select_fitness_center: "",

    show_update_confirm: false,
    update_confirm_title: "",
    update_confirm_text: "",
    update_confirm_is_validation: false,
    update_confirm_id: "",
    update_confirm_name: "",
    update_confirm_is_active: false,
    update_confirm_is_validated: false,
    update_confirm_is_undo_refuse: false,

    show_details_modal: false,
    details_modal_manager: {
        creation_date: 0,
        first_name: "",
        last_name: "",
        email_address: "",
        phone_number: "",
        is_active: false,
        last_update_activity: 0,
        last_update_admin_id: "",
        last_update_admin_name: "",
        last_update_admin_is_manager: false,
        is_refused: false,
        is_validated: false,
        validation_date: 0,
        validator_admin_id: "",
        validator_admin_name: "",
        validator_admin_is_manager: false,
        is_principal: false,
        fitness_center: {
            creation_date: 0,
            name: ""
        }
    }
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
                tmp_manager_activity_update[index].last_update_admin_is_manager = false;
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
                    tmp_manager_validation_update[index_val].last_update_admin_is_manager = false;
                } else {
                    tmp_manager_validation_update[index_val].is_active = false;
                    tmp_manager_validation_update[index_val].is_validated = false;
                    tmp_manager_validation_update[index_val].is_refused = true;
                }
                tmp_manager_validation_update[index_val].validation_date = action.payload.time;
                tmp_manager_validation_update[index_val].validator_admin_id = action.payload.validator_admin_id;
                tmp_manager_validation_update[index_val].validator_admin_name = action.payload.validator_admin_name;
                tmp_manager_validation_update[index_val].validator_admin_is_manager = false;


            }
            return {
                ...state,
                initial_managers: tmp_manager_validation_update,
                managers: tmp_manager_validation_update
            };
        case SET_UNDO_REFUSE_MANAGER:

            let tmp_manager_validation_undo_refuse = state.initial_managers;
            let index_val_undo = tmp_manager_validation_undo_refuse.findIndex(function (item) {
                return item._id === action.payload._id;
            });
            if (index_val_undo !== -1) {

                tmp_manager_validation_undo_refuse[index_val_undo].is_active = false;
                tmp_manager_validation_undo_refuse[index_val_undo].is_validated = false;
                tmp_manager_validation_undo_refuse[index_val_undo].is_refused = false;

                tmp_manager_validation_undo_refuse[index_val_undo].last_update_activity = 0;
                tmp_manager_validation_undo_refuse[index_val_undo].last_update_admin_id = "";
                tmp_manager_validation_undo_refuse[index_val_undo].last_update_admin_name = "";

                tmp_manager_validation_undo_refuse[index_val_undo].validation_date = 0;
                tmp_manager_validation_undo_refuse[index_val_undo].validator_admin_id = "";
                tmp_manager_validation_undo_refuse[index_val_undo].validator_admin_name = "";

            }
            return {
                ...state,
                initial_managers: tmp_manager_validation_undo_refuse,
                managers: tmp_manager_validation_undo_refuse
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
        case SET_MANAGERS_FILTER_SELECT_FITNESS_CENTER:
            return {
                ...state,
                filter_select_fitness_center: action.payload
            };
        case MANAGERS_RESET_FILTER:
            return {
                ...state,
                filter_name: initialState.filter_name,
                filter_select_fitness_center: initialState.filter_select_fitness_center
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
                update_confirm_is_validated: action.payload.update_confirm_is_validated,
                update_confirm_is_undo_refuse: action.payload.update_confirm_is_undo_refuse
            };
        case DISMISS_MANAGERS_UPDATE_CONFIRM:
            return {
                ...state,
                show_update_confirm: initialState.show_update_confirm,
                update_confirm_title: initialState.update_confirm_title,
                update_confirm_text: initialState.update_confirm_text,
                update_confirm_is_validation: initialState.update_confirm_is_validation,
                update_confirm_id: initialState.update_confirm_id,
                update_confirm_name: initialState.update_confirm_name,
                update_confirm_is_active: initialState.update_confirm_is_active,
                update_confirm_is_validated: initialState.update_confirm_is_validated,
                update_confirm_is_undo_refuse: initialState.update_confirm_is_undo_refuse
            };
        case DISPLAY_MANAGERS_DETAILS_MODAL:
            return {
                ...state,
                show_details_modal: true,
                details_modal_manager: action.payload
            };
        case DISMISS_MANAGERS_DETAILS_MODAL:
            return {
                ...state,
                show_details_modal: initialState.show_details_modal,
                details_modal_manager: initialState.details_modal_manager
            };
        default:
            return state;
    }
}