import {
    SET_ADMINISTRATORS,
    SET_ADMINISTRATORS_FILTER_NAME,
    SET_INITIAL_ADMINISTRATORS,
    DISPLAY_DELETE_USER_MODAL,
    DISMISS_DELETE_USER_MODAL

} from "./types"

export const setAdministrators = (admins) => {
    return {
        type: SET_ADMINISTRATORS,
        payload: admins
    };
};

export const setInitialAdministrators = (admins) => {
    return {
        type: SET_INITIAL_ADMINISTRATORS,
        payload: admins
    };
};

export const setAdministratorsFilterName = (value) => {
    return {
        type: SET_ADMINISTRATORS_FILTER_NAME,
        payload: value
    };
};

export const displayDeleteUserModal = (user_names) => {
    return {
        type: DISPLAY_DELETE_USER_MODAL,
        payload: user_names
    };
};

export const dismissDeleteUserModal = () => {
    return {
        type: DISMISS_DELETE_USER_MODAL
    };
};


