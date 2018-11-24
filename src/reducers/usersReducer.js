import {
    SET_USERS,
    SET_INITIAL_USERS,
    SET_USER_ACTIVITY,
    SET_USERS_FILTER_NAME,
    SET_USERS_FILTER_SELECT_FITNESS_CENTER,
    USERS_RESET_FILTER,
    DISPLAY_USERS_DETAILS_MODAL,
    DISMISS_USERS_DETAILS_MODAL,
    DISPLAY_USERS_UPDATE_CONFIRM,
    DISMISS_USERS_UPDATE_CONFIRM
} from "../actions/types"

const initialState = {
    users: [],
    initial_users: [],
    filter_select_fitness_center: "",
    filter_name: "",

    show_update_confirm: false,
    update_confirm_title: "",
    update_confirm_text: "",
    update_confirm_id: "",
    update_confirm_login: "",
    update_confirm_is_active: false,

    show_details_modal: false,
    details_modal_user: {
        creation_date: 0,
        first_name: "",
        last_name: "",
        email_address: "",
        login: "",
        is_active: false,
        last_update_activity: 0,
        last_update_admin_id: "",
        last_update_admin_name: "",
        reported_posts: [],
        fitness_center: {
            creation_date: 0,
            name: ""
        }
    }
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
        case SET_USER_ACTIVITY:

            let tmp_user_activity_update = state.initial_users;
            let index = tmp_user_activity_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });
            if (index !== -1) {
                tmp_user_activity_update[index].is_active = action.payload.is_active;
                tmp_user_activity_update[index].last_update_activity = action.payload.time;
                tmp_user_activity_update[index].last_update_admin_id = action.payload.last_update_admin_id;
                tmp_user_activity_update[index].last_update_admin_name = action.payload.last_update_admin_name;
            }
            return {
                ...state,
                initial_users: tmp_user_activity_update,
                users: tmp_user_activity_update
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
        case DISPLAY_USERS_DETAILS_MODAL:
            return {
                ...state,
                show_details_modal: true,
                details_modal_user: action.payload
            };
        case DISMISS_USERS_DETAILS_MODAL:
            return {
                ...state,
                show_details_modal: false,
                details_modal_user: initialState.details_modal_user
            };
        case DISPLAY_USERS_UPDATE_CONFIRM:
            return {
                ...state,
                show_update_confirm: true,
                update_confirm_title: action.payload.update_confirm_title,
                update_confirm_text: action.payload.update_confirm_text,
                update_confirm_id: action.payload.update_confirm_id,
                update_confirm_login: action.payload.update_confirm_login,
                update_confirm_is_active: action.payload.update_confirm_is_active
            };
        case DISMISS_USERS_UPDATE_CONFIRM:
            return {
                ...state,
                show_update_confirm: initialState.show_update_confirm,
                update_confirm_title: initialState.update_confirm_title,
                update_confirm_text: initialState.update_confirm_text,
                update_confirm_id: initialState.update_confirm_id,
                update_confirm_login: initialState.update_confirm_login,
                update_confirm_is_active: initialState.update_confirm_is_active
            };
        default:
            return state;
    }
}