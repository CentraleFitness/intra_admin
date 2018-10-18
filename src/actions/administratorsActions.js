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

export const setAdministrator = (admin) => {
    return {
        type: SET_ADMINISTRATOR,
        payload: admin
    };
};

export const addAdministrator = (admin) => {
    return {
        type: ADD_ADMINISTRATOR,
        payload: admin
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

export const displayEditAdministratorModal = (user_names) => {
    return {
        type: DISPLAY_EDIT_USER_MODAL,
        payload: user_names
    };
};

export const displayCreateAdministratorModal = (user_names) => {
    return {
        type: DISPLAY_CREATE_USER_MODAL,
        payload: user_names
    };
};

export const dismissEditAdministratorModal = () => {
    return {
        type: DISMISS_EDIT_USER_MODAL
    };
};

export const resetCurrentAdministrator = () => {
    return {
        type: RESET_CURRENT_ADMINISTRATOR
    };
};

export const setCurrentAdministratorFirstName = (value) => {
    return {
        type: SET_CURRENT_ADMINISTRATOR_FIRST_NAME,
        payload: value
    };
};

export const setCurrentAdministratorLastName = (value) => {
    return {
        type: SET_CURRENT_ADMINISTRATOR_LAST_NAME,
        payload: value
    };
};

export const setCurrentAdministratorEmail = (value) => {
    return {
        type: SET_CURRENT_ADMINISTRATOR_EMAIL,
        payload: value
    };
};

export const setCurrentAdministratorPhone = (value) => {
    return {
        type: SET_CURRENT_ADMINISTRATOR_PHONE,
        payload: value
    };
};

export const setCurrentAdministratorPassword = (value) => {
    return {
        type: SET_CURRENT_ADMINISTRATOR_PASSWORD,
        payload: value
    };
};

export const setCurrentAdministratorPasswordConfirm = (value) => {
    return {
        type: SET_CURRENT_ADMINISTRATOR_PASSWORD_CONFIRM,
        payload: value
    };
};