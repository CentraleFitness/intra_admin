import {
    SET_MANAGERS_FEEDBACKS,
    SET_USERS_FEEDBACKS,
    DISPLAY_FEEDBACK,
    DISMISS_FEEDBACK
} from "../actions/types"

const initialState = {
    users_feedbacks: [
        {

        }
    ],

    managers_feedbacks: [],
    showFeedback: false,
    currentFeedback: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        case SET_MANAGERS_FEEDBACKS:
            return {
                ...state,
                managers_feedbacks: action.payload
            };
        case DISPLAY_FEEDBACK:
            return {
                ...state,
                showFeedback: true,
                currentFeedback: action.payload
            };
        case DISMISS_FEEDBACK:
            return {
                ...state,
                showFeedback: false,
                currentFeedback: {}
            };
        case SET_USERS_FEEDBACKS:
            return {
                ...state,
                users_feedbacks: action.payload
            };
    }
}