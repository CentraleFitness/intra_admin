import {
    SET_MANAGERS_FEEDBACKS,
    SET_INITIAL_MANAGERS_FEEDBACKS,
    SET_FEEDBACK_STATES,
    SET_USERS_FEEDBACKS,
    SET_INITIAL_USERS_FEEDBACKS,
    DISPLAY_FEEDBACK,
    DISMISS_FEEDBACK,
    ADD_FEEDBACK_RESPONSE,
    SET_FEEDBACK_STATE,
    SET_MANAGER_FILTER_STATUS,
    SET_MANAGER_FILTER_KEYWORD,
    SET_USERS_FILTER_KEYWORD
} from "./types"

export const setManagersFeedbacks = (feebacks) => {
    return {
        type: SET_MANAGERS_FEEDBACKS,
        payload: feebacks
    };
};

export const setInitialManagersFeedbacks = (feebacks) => {
    return {
        type: SET_INITIAL_MANAGERS_FEEDBACKS,
        payload: feebacks
    };
};

export const setFeedbackStates = (feeback_states) => {
    return {
        type: SET_FEEDBACK_STATES,
        payload: feeback_states
    };
};

export const setUsersFeedbacks = (feedbacks) => {
    return {
        type: SET_USERS_FEEDBACKS,
        payload: feedbacks
    };
};

export const setInitialUsersFeedbacks = (feedbacks) => {
    return {
        type: SET_INITIAL_USERS_FEEDBACKS,
        payload: feedbacks
    };
};

export const displayFeedback = (feeback) => {
    return {
        type: DISPLAY_FEEDBACK,
        payload: feeback
    };
};

export const dismissFeedback = () => {
    return {
        type: DISMISS_FEEDBACK
    };
};

export const addFeedbackResponse = (response) => {
    return {
        type: ADD_FEEDBACK_RESPONSE,
        payload: response
    };
};

export const setFeedbackState = (infos) => {
    return {
        type: SET_FEEDBACK_STATE,
        payload: infos
    };
};

export const setManagerFilterStatus = (response) => {
    return {
        type: SET_MANAGER_FILTER_STATUS,
        payload: response
    };
};

export const setManagerFilterKeywords = (infos) => {
    return {
        type: SET_MANAGER_FILTER_KEYWORD,
        payload: infos
    };
};

export const setUsersFilterKeywords = (infos) => {
    return {
        type: SET_USERS_FILTER_KEYWORD,
        payload: infos
    };
};
