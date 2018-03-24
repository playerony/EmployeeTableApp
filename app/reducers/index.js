import { combineReducers } from 'redux'

import { fetchEmployees } from './employees.reducer'
import { pagination } from './pagination.reducer'

const rootReducer = combineReducers({
    fetchEmployees,
    pagination
})

export default rootReducer