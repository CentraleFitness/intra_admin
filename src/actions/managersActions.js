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

export const setManagersFilterFitnessCenter = (fitness_center) => {
    return {
        type: SET_MANAGERS_FILTER_FITNESS_CENTER,
        payload: fitness_center
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