import {
    SET_MANAGERS_FEEDBACKS,
    SET_FEEDBACK_STATES,
    SET_USERS_FEEDBACKS,
    DISPLAY_FEEDBACK,
    DISMISS_FEEDBACK
} from "./types"

export const setManagersFeedbacks = (feebacks) => {
    return {
        type: SET_MANAGERS_FEEDBACKS,
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
