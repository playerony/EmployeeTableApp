import {
    NEXT_PAGE,
    PREV_PAGE,
    INIT_PAGINATION
} from '../constants/pagination.constants.js'

export function nextPage(pageNumber) {
    return {
        type: NEXT_PAGE,
        pageNumber
    }
}

export function prevPage(pageNumber) {
    return {
        type: PREV_PAGE,
        pageNumber
    }
}

export function initPagination(data, pageSize) {
    return {
        type: INIT_PAGINATION,
        data,
        pageSize
    }
}
