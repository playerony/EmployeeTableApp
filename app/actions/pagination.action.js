import {
    INIT_PAGINATION,
    NEXT_PAGE,
    PREV_PAGE,
    SORT,
    FIRSTNAME_FILTER,
    LASTNAME_FILTER,
    DATEOFBIRTH_FILTER,
    COMPANY_FILTER,
    NOTE_FILTER,
    RESET_FILTERS,
    FILTER
} from '../constants/pagination.constants.js'

export function nextPage() {
    return {
        type: NEXT_PAGE
    }
}

export function prevPage() {
    return {
        type: PREV_PAGE
    }
}

export function initPagination(data, pageSize) {
    return {
        type: INIT_PAGINATION,
        data,
        pageSize
    }
}

export function sort(column) {
    return {
        type: SORT,
        column
    }
}

export function addFirstNameFilter(value) {
    return {
        type: FIRSTNAME_FILTER,
        value
    }
}

export function addLastNameFilter(value) {
    return {
        type: LASTNAME_FILTER,
        value
    }
}

export function addDateOfBirthFilter(value) {
    return {
        type: DATEOFBIRTH_FILTER,
        value
    }
}

export function addCompanyFilter(value) {
    return {
        type: COMPANY_FILTER,
        value
    }
}

export function addNoteFilter(value) {
    return {
        type: NOTE_FILTER,
        value
    }
}

export function resetFilters() {
    return {
        type: RESET_FILTERS
    }
}

export function filter() {
    return {
        type: FILTER
    }
}