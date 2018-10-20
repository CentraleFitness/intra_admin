import {
    DISPLAY_ALERT,
    DISMISS_ALERT,

    SET_ADMINISTRATORS_IS_LOAD,
    SET_USERS_FEEDBACKS_IS_LOAD,
    SET_MANAGERS_FEEDBACKS_IS_LOAD,
    SET_MANAGERS_IS_LOAD,
    SET_FITNESS_CENTERS_IS_LOAD,
    SET_MODULES_IS_LOAD,
    SET_MODULE_STATES_IS_LOAD,

    SET_ADMINISTRATORS_IS_NOT_LOAD,
    SET_USERS_FEEDBACKS_IS_NOT_LOAD,
    SET_MANAGERS_FEEDBACKS_IS_NOT_LOAD,
    SET_MANAGERS_IS_NOT_LOAD,
    SET_FITNESS_CENTERS_IS_NOT_LOAD,
    SET_MODULES_IS_NOT_LOAD,
    SET_MODULE_STATES_IS_NOT_LOAD

} from "./types"

export const displayAlert = (alertInfo) => {
    return {
        type: DISPLAY_ALERT,
        payload: alertInfo
    };
};

export const dismissAlert = () => {
    return {
        type: DISMISS_ALERT
    };
};

export const setAdministratorsIsLoad = () => {
    return {
        type: SET_ADMINISTRATORS_IS_LOAD
    };
};

export const setUsersFeedbacksIsLoad = () => {
    return {
        type: SET_USERS_FEEDBACKS_IS_LOAD
    };
};

export const setManagersFeedbacksIsLoad = () => {
    return {
        type: SET_MANAGERS_FEEDBACKS_IS_LOAD
    };
};

export const setManagersIsLoad = () => {
    return {
        type: SET_MANAGERS_IS_LOAD
    };
};

export const setFitnessCentersIsLoad = () => {
    return {
        type: SET_FITNESS_CENTERS_IS_LOAD
    };
};

export const setModulesIsLoad = () => {
    return {
        type: SET_MODULES_IS_LOAD
    };
};

export const setModuleStatesIsLoad = () => {
    return {
        type: SET_MODULE_STATES_IS_LOAD
    };
};




export const setAdministratorsIsNotLoad = () => {
    return {
        type: SET_ADMINISTRATORS_IS_NOT_LOAD
    };
};

export const setUsersFeedbacksIsNotLoad = () => {
    return {
        type: SET_USERS_FEEDBACKS_IS_NOT_LOAD
    };
};

export const setManagersFeedbacksIsNotLoad = () => {
    return {
        type: SET_MANAGERS_FEEDBACKS_IS_NOT_LOAD
    };
};


export const setManagersIsNotLoad = () => {
    return {
        type: SET_MANAGERS_IS_NOT_LOAD
    };
};

export const setFitnessCentersIsNotLoad = () => {
    return {
        type: SET_FITNESS_CENTERS_IS_NOT_LOAD
    };
};

export const setModulesIsNotLoad = () => {
    return {
        type: SET_MODULES_IS_NOT_LOAD
    };
};

export const setModuleStatesIsNotLoad = () => {
    return {
        type: SET_MODULE_STATES_IS_NOT_LOAD
    };
};
