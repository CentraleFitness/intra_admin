import {
    SET_MANAGERS_FEEDBACKS,
    SET_USERS_FEEDBACKS,
    DISPLAY_FEEDBACK,
    DISMISS_FEEDBACK
} from "../actions/types"

const initialState = {
    users_feedbacks: [
        {
            "_id": "test",
            "email": "test@test.com",
            "content": "This is the content of our description",
            "date": "Sun Nov 11 19:00:00 GMT 2018",
            "version": "1.1.0BETA",
            "__v": 0
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