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
} from "./types"

export const setModules = (modules) => {
    return {
        type: SET_MODULES,
        payload: modules
    };
};

export const setInitialModules = (modules) => {
    return {
        type: SET_INITIAL_MODULES,
        payload: modules
    };
};

export const addModule = (module) => {
    return {
        type: ADD_MODULE,
        payload: module
    };
};

export const updateModule = (module) => {
    return {
        type: UPDATE_MODULE,
        payload: module
    };
};

export const setModuleStates = (module_states) => {
    return {
        type: SET_MODULE_STATES,
        payload: module_states
    };
};

export const setModulesFilterUuid = (value) => {
    return {
        type: SET_MODULES_FILTER_UUID,
        payload: value
    };
};

export const setModulesFilterSelectFitnessCenter = (value) => {
    return {
        type: SET_MODULES_FILTER_SELECT_FITNESS_CENTER,
        payload: value
    };
};

export const modulesResetFilters = (value) => {
    return {
        type: MODULES_RESET_FILTER,
        payload: value
    };
};

export const displayEditModuleModal = (module) => {
    return {
        type: DISPLAY_EDIT_MODULE_MODAL,
        payload: module
    };
};

export const displayCreateModuleModal = () => {
    return {
        type: DISPLAY_CREATE_MODULE_MODAL
    };
};

export const dismissEditModuleModal = () => {
    return {
        type: DISMISS_EDIT_MODULE_MODAL
    };
};

export const setCurrentModuleAutoGenerateUuid = (value) => {
    return {
        type: SET_CURRENT_MODULE_AUTO_GENERATE_UUID,
        payload: value
    };
};

export const setCurrentModuleUuid = (value) => {
    return {
        type: SET_CURRENT_MODULE_UUID,
        payload: value
    };
};

export const setCurrentModuleFitnessCenterId = (value) => {
    return {
        type: SET_CURRENT_MODULE_FITNESS_CENTER_ID,
        payload: value
    };
};

export const setCurrentModuleMachineType = (value) => {
    return {
        type: SET_CURRENT_MODULE_MACHINE_TYPE,
        payload: value
    };
};

export const setCurrentModuleModuleStateId = (value) => {
    return {
        type: SET_CURRENT_MODULE_MODULE_STATE_ID,
        payload: value
    };
};