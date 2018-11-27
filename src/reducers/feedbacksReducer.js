import {
    SET_MANAGERS_FEEDBACKS,
    SET_FEEDBACK_STATES,
    SET_USERS_FEEDBACKS,
    DISPLAY_FEEDBACK,
    DISMISS_FEEDBACK
} from "../actions/types"

const initialState = {
    users_feedbacks: [],

    managers_feedbacks: [],
    feedback_states: [],
    currentFeedback: {
        _id: "t",
        email: "",
        fitness_center: {
            name: "",
            zip_code: "",
            city: ""
        },
        user: {
            first_name: "",
            last_name: "",
            login: ""
        },
        content: "",
        date: "",
        version: "",
        __v: 0
    },
    showManagerFeedback: false,
    showUserFeedback: false
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
        case SET_FEEDBACK_STATES:
            return {
                ...state,
                feedback_states: action.payload
            };
        case DISPLAY_FEEDBACK:
            return {
                ...state,
                showManagerFeedback: action.payload.isManager === true,
                showUserFeedback: action.payload.isManager === false,
                currentFeedback: action.payload.feedback
            };
        case DISMISS_FEEDBACK:
            return {
                ...state,
                showManagerFeedback: false,
                showUserFeedback: false,
                currentFeedback: initialState.currentFeedback
            };
        case SET_USERS_FEEDBACKS:
            return {
                ...state,
                users_feedbacks: action.payload
            };
    }
}