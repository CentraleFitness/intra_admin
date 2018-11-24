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
} from "./types"

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    };
};

export const setInitialUsers = (users) => {
    return {
        type: SET_INITIAL_USERS,
        payload: users
    };
};

export const setUserActivity = (user) => {
    return {
        type: SET_USER_ACTIVITY,
        payload: user
    };
};

export const usersResetFilters = () => {
    return {
        type: USERS_RESET_FILTER
    };
};

export const setUsersFilterName = (value) => {
    return {
        type: SET_USERS_FILTER_NAME,
        payload: value
    };
};

export const setUsersFilterSelectFitnessCenter = (value) => {
    return {
        type: SET_USERS_FILTER_SELECT_FITNESS_CENTER,
        payload: value
    };
};

export const displayUserDetailsModal = (modal_infos) => {
    return {
        type: DISPLAY_USERS_DETAILS_MODAL,
        payload: modal_infos
    };
};

export const dismissUserDetailsModal = () => {
    return {
        type: DISMISS_USERS_DETAILS_MODAL
    };
};

export const displayUserUpdateConfirm = (modal_infos) => {
    return {
        type: DISPLAY_USERS_UPDATE_CONFIRM,
        payload: modal_infos
    };
};

export const dismissUserUpdateConfirm = () => {
    return {
        type: DISMISS_USERS_UPDATE_CONFIRM
    };
};