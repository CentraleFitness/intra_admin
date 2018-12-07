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
} from "../actions/types"

const initialState = {
    users_feedbacks: [],
    users_filter_keywords: "",
    initial_users_feedbacks: [],

    manager_filter_keywords: "",
    manager_filter_status: 0,
    managers_feedbacks: [],
    initial_managers_feedbacks: [],
    updateManager: false,
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
    let tmp_feedback_update;
    let index;

    switch (action.type) {
        default:
            return state;
        case SET_MANAGERS_FEEDBACKS:
            return {
                ...state,
                managers_feedbacks: action.payload
            };
        case SET_INITIAL_MANAGERS_FEEDBACKS:
            return {
                ...state,
                initial_managers_feedbacks: action.payload
            };
        case SET_FEEDBACK_STATES:
            return {
                ...state,
                feedback_states: action.payload
            };
        case SET_FEEDBACK_STATE:
            tmp_feedback_update = state.initial_managers_feedbacks;
            index = tmp_feedback_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });

            tmp_feedback_update[index].feedback_state = action.payload.feedback_state;
            tmp_feedback_update[index].feedback_state_name = action.payload.feedback_state_name;
            tmp_feedback_update[index].update_date = action.payload.date;

            return {
                ...state,
                managers_feedbacks: tmp_feedback_update,
                initial_managers_feedbacks: tmp_feedback_update,
                updateManager: (state.updateManager === false)
            };
        case ADD_FEEDBACK_RESPONSE:
            tmp_feedback_update = state.initial_managers_feedbacks;
            index = tmp_feedback_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });

            tmp_feedback_update[index].responses.push({
                content: action.payload.content,
                date: action.payload.date,
                author: action.payload.author,
                is_admin: action.payload.is_admin
            });

            tmp_feedback_update[index].feedback_state = action.payload.feedback_state;
            tmp_feedback_update[index].feedback_state_name = action.payload.feedback_state_name;
            tmp_feedback_update[index].update_date = action.payload.date;

            return {
                ...state,
                managers_feedbacks: tmp_feedback_update,
                initial_managers_feedbacks: tmp_feedback_update,
                updateManager: (state.updateManager === false)
            };
        case SET_MANAGER_FILTER_STATUS:
            return {
                ...state,
                manager_filter_status: action.payload
            };
        case SET_MANAGER_FILTER_KEYWORD:
            return {
                ...state,
                manager_filter_keywords: action.payload
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
        case SET_INITIAL_USERS_FEEDBACKS:
            return {
                ...state,
                initial_users_feedbacks: action.payload
            };
        case SET_USERS_FILTER_KEYWORD:
            return {
                ...state,
                users_filter_keywords: action.payload
            };
    }
}