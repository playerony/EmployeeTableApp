import {
    NEXT_PAGE,
    PREV_PAGE,
    INIT_PAGINATION
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
