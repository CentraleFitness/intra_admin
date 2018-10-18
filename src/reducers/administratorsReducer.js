import {
    SET_ADMINISTRATORS,
    SET_ADMINISTRATOR,
    ADD_ADMINISTRATOR,

    SET_ADMINISTRATORS_FILTER_NAME,

    SET_INITIAL_ADMINISTRATORS,
    DISPLAY_DELETE_USER_MODAL,
    DISMISS_DELETE_USER_MODAL,
    DISPLAY_EDIT_USER_MODAL,
    DISPLAY_CREATE_USER_MODAL,
    DISMISS_EDIT_USER_MODAL,

    RESET_CURRENT_ADMINISTRATOR,
    SET_CURRENT_ADMINISTRATOR_FIRST_NAME,
    SET_CURRENT_ADMINISTRATOR_LAST_NAME,
    SET_CURRENT_ADMINISTRATOR_EMAIL,
    SET_CURRENT_ADMINISTRATOR_PHONE,
    SET_CURRENT_ADMINISTRATOR_PASSWORD,
    SET_CURRENT_ADMINISTRATOR_PASSWORD_CONFIRM

} from "../actions/types"

const initialState = {
    administrators: [],
    initial_administrators: [],

    filter_name: "",

    showDeleteConfirm: false,
    delete_first_name: "",
    delete_last_name: "",
    delete_id: "",

    show_edit_modal: false,
    edit_modal_admininistrator: {
        _id: "",
        first_name: "",
        last_name: "",
        email_address: "",
        phone_number: "",
        password: "",
        confirm_password: "",
        creation_date: "",
        update_date: ""
    },
    keep_edit_modal_admininistrator: {
        _id: "",
        first_name: "",
        last_name: "",
        email_address: "",
        phone_number: "",
        password: "",
        confirm_password: "",
        creation_date: "",
        update_date: ""
    }
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
        case SET_ADMINISTRATOR:
            let tmp_admin_update = state.initial_administrators;
            let index = tmp_admin_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });
            if (index !== -1) {
                tmp_admin_update[index].first_name = action.payload.first_name;
                tmp_admin_update[index].last_name = action.payload.last_name;
                tmp_admin_update[index].email_address = action.payload.email_address;
                tmp_admin_update[index].phone_number = action.payload.phone_number;
                tmp_admin_update[index].update_date = action.payload.time;
            }
            return {
                ...state,
                initial_managers: tmp_admin_update,
                managers: tmp_admin_update
            };
        case ADD_ADMINISTRATOR:
            let tmp_admin_add = state.initial_administrators;
            tmp_admin_add.unshift(action.payload);
            return {
                ...state,
                initial_managers: tmp_admin_add,
                managers: tmp_admin_add
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
                delete_last_name: action.payload.last_name,
                delete_id: action.payload._id
            };
        case DISMISS_DELETE_USER_MODAL:
            return {
                ...state,
                showDeleteConfirm: false,
                delete_first_name: "",
                delete_last_name: "",
                delete_id: ""
            };
        case DISPLAY_EDIT_USER_MODAL:
            return {
                ...state,
                show_edit_modal: true,
                edit_modal_admininistrator: {
                    _id: action.payload._id,
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    email_address: action.payload.email_address,
                    phone_number: action.payload.phone_number,
                    password: initialState.edit_modal_admininistrator.password,
                    confirm_password: initialState.edit_modal_admininistrator.confirm_password,
                    creation_date: action.payload.creation_date,
                    update_date: action.payload.update_date
                },
                keep_edit_modal_admininistrator: {
                    _id: action.payload._id,
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    email_address: action.payload.email_address,
                    phone_number: action.payload.phone_number,
                    password: initialState.edit_modal_admininistrator.password,
                    confirm_password: initialState.edit_modal_admininistrator.confirm_password,
                    creation_date: action.payload.creation_date,
                    update_date: action.payload.update_date
                }
            };
        case DISPLAY_CREATE_USER_MODAL:
            return {
                ...state,
                show_edit_modal: true,
                edit_modal_admininistrator: {
                    _id: initialState.edit_modal_admininistrator._id,
                    first_name: initialState.edit_modal_admininistrator.first_name,
                    last_name: initialState.edit_modal_admininistrator.last_name,
                    email_address: initialState.edit_modal_admininistrator.email_address,
                    phone_number: initialState.edit_modal_admininistrator.phone_number,
                    password: initialState.edit_modal_admininistrator.password,
                    confirm_password: initialState.edit_modal_admininistrator.confirm_password,
                    creation_date: initialState.edit_modal_admininistrator.creation_date,
                    update_date: initialState.edit_modal_admininistrator.update_date
                },
                keep_edit_modal_admininistrator: {
                    _id: initialState.edit_modal_admininistrator._id,
                    first_name: initialState.edit_modal_admininistrator.first_name,
                    last_name: initialState.edit_modal_admininistrator.last_name,
                    email_address: initialState.edit_modal_admininistrator.email_address,
                    phone_number: initialState.edit_modal_admininistrator.phone_number,
                    password: initialState.edit_modal_admininistrator.password,
                    confirm_password: initialState.edit_modal_admininistrator.confirm_password,
                    creation_date: initialState.edit_modal_admininistrator.creation_date,
                    update_date: initialState.edit_modal_admininistrator.update_date
                }
            };
        case DISMISS_EDIT_USER_MODAL:
            return {
                ...state,
                show_edit_modal: initialState.show_edit_modal,
                edit_modal_admininistrator: initialState.edit_modal_admininistrator,
                keep_edit_modal_admininistrator: initialState.keep_edit_modal_admininistrator
            };
        case RESET_CURRENT_ADMINISTRATOR:
            return {
                ...state,
                edit_modal_admininistrator: {
                    ...state.edit_modal_admininistrator,
                    first_name: state.keep_edit_modal_admininistrator.first_name,
                    last_name: state.keep_edit_modal_admininistrator.last_name,
                    email_address: state.keep_edit_modal_admininistrator.email_address,
                    phone_number: state.keep_edit_modal_admininistrator.phone_number,
                    password: state.keep_edit_modal_admininistrator.password,
                    confirm_password: state.keep_edit_modal_admininistrator.confirm_password
                }
            };
        case SET_CURRENT_ADMINISTRATOR_FIRST_NAME:
            return {
                ...state,
                edit_modal_admininistrator: {
                    ...state.edit_modal_admininistrator,
                    first_name: action.payload
                }
            };
        case SET_CURRENT_ADMINISTRATOR_LAST_NAME:
            return {
                ...state,
                edit_modal_admininistrator: {
                    ...state.edit_modal_admininistrator,
                    last_name: action.payload
                }
            };
        case SET_CURRENT_ADMINISTRATOR_EMAIL:
            return {
                ...state,
                edit_modal_admininistrator: {
                    ...state.edit_modal_admininistrator,
                    email_address: action.payload
                }
            };
        case SET_CURRENT_ADMINISTRATOR_PHONE:
            return {
                ...state,
                edit_modal_admininistrator: {
                    ...state.edit_modal_admininistrator,
                    phone_number: action.payload
                }
            };
        case SET_CURRENT_ADMINISTRATOR_PASSWORD:
            return {
                ...state,
                edit_modal_admininistrator: {
                    ...state.edit_modal_admininistrator,
                    password: action.payload
                }
            };
        case SET_CURRENT_ADMINISTRATOR_PASSWORD_CONFIRM:
            return {
                ...state,
                edit_modal_admininistrator: {
                    ...state.edit_modal_admininistrator,
                    confirm_password: action.payload
                }
            };
        default:
            return state;
    }
}