import {
    REQUEST_EMPLOYEES,
    RECEIVE_EMPLOYEES,
    FAILURE_EMPLOYEES
} from '../constants/employees.constants'

export function fetchEmployees(
    state = {
        isFetching: false,
        isError: false,
        payload: []
    },
    action
) {
    switch (action.type) {
        case REQUEST_EMPLOYEES:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_EMPLOYEES:
            return Object.assign({}, state, {
                isFetching: false,
                payload: action.data
            })
        case FAILURE_EMPLOYEES:
            return Object.assign({}, state, {
                isError: true,
                isFetching: false,
                error: action.error
            })
        default:
            return state
    }
}