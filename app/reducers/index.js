import { combineReducers } from 'redux'

import { fetchEmployees } from './employees.reducer'

const rootReducer = combineReducers({
    fetchEmployees
})

export default rootReducer