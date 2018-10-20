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
} from "./types"

export const setManagers = (managers) => {
    return {
        type: SET_MANAGERS,
        payload: managers
    };
};

export const setInitialManagers = (managers) => {
    return {
        type: SET_INITIAL_MANAGERS,
        payload: managers
    };
};

export const setManagerActivity = (manager) => {
    return {
        type: SET_MANAGER_ACTIVITY,
        payload: manager
    };
};

export const setValidateManager = (manager) => {
    return {
        type: SET_VALIDATE_MANAGER,
        payload: manager
    };
};

export const setUndoRefuseManager = (manager) => {
    return {
        type: SET_UNDO_REFUSE_MANAGER,
        payload: manager
    };
};

export const setFitnessCenters = (fitness_centers) => {
    return {
        type: SET_FITNESS_CENTERS,
        payload: fitness_centers
    };
};

export const setManagersFilterName = (name) => {
    return {
        type: SET_MANAGERS_FILTER_NAME,
        payload: name
    };
};

export const setManagersFilterSelectFitnessCenter = (value) => {
    return {
        type: SET_MANAGERS_FILTER_SELECT_FITNESS_CENTER,
        payload: value
    };
};

export const managersResetFilters = (value) => {
    return {
        type: MANAGERS_RESET_FILTER,
        payload: value
    };
};

export const displayManagerUpdateConfirm = (confirm_info) => {
    return {
        type: DISPLAY_MANAGERS_UPDATE_CONFIRM,
        payload: confirm_info
    };
};

export const dismissManagerUpdateConfirm = () => {
    return {
        type: DISMISS_MANAGERS_UPDATE_CONFIRM
    };
};

export const displayManagerDetailsModal = (manager) => {
    return {
        type: DISPLAY_MANAGERS_DETAILS_MODAL,
        payload: manager
    };
};

export const dismissManagerDetailsModal = () => {
    return {
        type: DISMISS_MANAGERS_DETAILS_MODAL
    };
};