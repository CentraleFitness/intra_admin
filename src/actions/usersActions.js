import {
    SET_USERS,
    SET_INITIAL_USERS,
    SET_USERS_FILTER_NAME,
    SET_USERS_FILTER_SELECT_FITNESS_CENTER,
    USERS_RESET_FILTER
} from "./types"

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    };
};

export const setInitialUsers = (users) => {
    return {
        type: SET_INITIAL_USERS,
        payload: users
    };
};

export const usersResetFilters = () => {
    return {
        type: USERS_RESET_FILTER
    };
};

export const setUsersFilterName = (value) => {
    return {
        type: SET_USERS_FILTER_NAME,
        payload: value
    };
};

export const setUsersFilterSelectFitnessCenter = (value) => {
    return {
        type: SET_USERS_FILTER_SELECT_FITNESS_CENTER,
        payload: value
    };
};