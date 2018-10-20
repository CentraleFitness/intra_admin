import {
    SET_MODULES,
    SET_INITIAL_MODULES,
    ADD_MODULE,
    UPDATE_MODULE,

    SET_MODULE_STATES,
    SET_MODULES_FILTER_UUID,
    SET_MODULES_FILTER_SELECT_FITNESS_CENTER,
    MODULES_RESET_FILTER,

    DISPLAY_EDIT_MODULE_MODAL,
    DISPLAY_CREATE_MODULE_MODAL,
    DISMISS_EDIT_MODULE_MODAL,

    SET_CURRENT_MODULE_AUTO_GENERATE_UUID,
    SET_CURRENT_MODULE_UUID,
    SET_CURRENT_MODULE_FITNESS_CENTER_ID,
    SET_CURRENT_MODULE_MACHINE_TYPE,
    SET_CURRENT_MODULE_MODULE_STATE_ID
} from "../actions/types"

const initialState = {
    modules: [],
    initial_modules: [],
    module_states: [],
    filter_uuid: "",
    filter_select_fitness_center: "",

    show_edit_modal: false,
    edit_modal_module: {
        _id: "",
        auto_generate_uuid: true,
        UUID: "",
        fitness_center_id: "",
        machine_type: "",
        module_state_id: "",
        module_state_code: 0
    },
    keep_edit_modal_module: {
        _id: "",
        auto_generate_uuid: true,
        UUID: "",
        fitness_center_id: "",
        machine_type: "",
        module_state_id: "",
        module_state_code: 0
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MODULES:
            return {
                ...state,
                modules: action.payload
            };
        case SET_INITIAL_MODULES:
            return {
                ...state,
                initial_modules: action.payload
            };
        case ADD_MODULE:
            let tmp_module_add = state.initial_modules;
            tmp_module_add.unshift(action.payload);
            return {
                ...state,
                initial_modules: tmp_module_add,
                modules: tmp_module_add
            };
        case UPDATE_MODULE:
            let tmp_module_update = state.initial_modules;
            let index = tmp_module_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });
            if (index !== -1) {
                tmp_module_update[index].fitness_center_id = action.payload.fitness_center_id;
                tmp_module_update[index].machine_type = action.payload.machine_type;
                tmp_module_update[index].module_state_code = action.payload.module_state_code;
                tmp_module_update[index].module_state_id = action.payload.module_state_id;
                tmp_module_update[index].update_date = action.payload.time;
            }
            return {
                ...state,
                initial_modules: tmp_module_update,
                modules: tmp_module_update
            };
        case SET_MODULE_STATES:
            return {
                ...state,
                module_states: action.payload
            };
        case SET_MODULES_FILTER_UUID:
            return {
                ...state,
                filter_uuid: action.payload
            };
        case SET_MODULES_FILTER_SELECT_FITNESS_CENTER:
            return {
                ...state,
                filter_select_fitness_center: action.payload
            };
        case MODULES_RESET_FILTER:
            return {
                ...state,
                filter_uuid: initialState.filter_uuid,
                filter_select_fitness_center: initialState.filter_select_fitness_center
            };
        case DISPLAY_EDIT_MODULE_MODAL:
            return {
                ...state,
                show_edit_modal: true,
                edit_modal_module: action.payload,
                keep_edit_modal_module: action.payload
            };
        case DISPLAY_CREATE_MODULE_MODAL:
            return {
                ...state,
                show_edit_modal: true,
                edit_modal_module: initialState.edit_modal_module,
                keep_edit_modal_module: initialState.edit_modal_module
            };
        case DISMISS_EDIT_MODULE_MODAL:
            return {
                ...state,
                show_edit_modal: false,
                edit_modal_module: initialState.edit_modal_module,
                keep_edit_modal_module: initialState.edit_modal_module
            };
        case SET_CURRENT_MODULE_AUTO_GENERATE_UUID:
            return {
                ...state,
                edit_modal_module: {
                    ...state.edit_modal_module,
                    auto_generate_uuid: action.payload
                }
            };
        case SET_CURRENT_MODULE_UUID:
            return {
                ...state,
                edit_modal_module: {
                    ...state.edit_modal_module,
                    UUID: action.payload
                }
            };
        case SET_CURRENT_MODULE_FITNESS_CENTER_ID:
            return {
                ...state,
                edit_modal_module: {
                    ...state.edit_modal_module,
                    fitness_center_id: action.payload
                }
            };
        case SET_CURRENT_MODULE_MACHINE_TYPE:
            return {
                ...state,
                edit_modal_module: {
                    ...state.edit_modal_module,
                    machine_type: action.payload
                }
            };
        case SET_CURRENT_MODULE_MODULE_STATE_ID:
            return {
                ...state,
                edit_modal_module: {
                    ...state.edit_modal_module,
                    module_state_id: action.payload._id,
                    module_state_code: action.payload.code
                }
            };
        default:
            return state;
    }
}