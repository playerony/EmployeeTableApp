import {
    REQUEST_EMPLOYEES,
    RECEIVE_EMPLOYEES,
    FAILURE_EMPLOYEES
} from '../constants/employees.constants'

import * as employeeService from '../services/employee.service'

function requestEmployees() {
    return {
        type: REQUEST_EMPLOYEES
    }
}

function receiveEmployees(json) {
    return {
        type: RECEIVE_EMPLOYEES,
        data: json
    }
}

function failureEmployees(error) {
    return {
        type: REQUEST_EMPLOYEES
    }
}

export function fetchEmployees() {
    return dispatch => {
        dispatch(requestEmployees())
        employeeService.fetchEmployees()
            .then(json => {
                dispatch(receiveEmployees(json))
            })
            .catch(function(error) {
                dispatch(failureEmployees(error))
            })
    }
}