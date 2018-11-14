import {
    SET_MANAGERS_FEEDBACKS,
    SET_USERS_FEEDBACKS,
    DISPLAY_FEEDBACK,
    DISMISS_FEEDBACK
} from "../actions/types"

const initialState = {
    users_feedbacks: [
        {
            _id: "test",
            email: "test@test.com",
            fitness_center: {
                name: "Keep Cool",
                zip_code: "75000",
                city: "Paris"
            },
            user: {
                first_name: "Julien",
                last_name: "LE FADA",
                login: "Eljuju13"
            },
            content: "This is the content of our description",
            date: "Sun Nov 11 19:00:00 GMT 2018",
            version: "1.1.0BETA",
            __v: 0
        }
    ],

    managers_feedbacks: [],
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