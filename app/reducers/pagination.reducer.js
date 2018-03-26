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
import * as PaginationUtil from '../utils/PaginationUtil'

export function pagination(
    state = {
        filters: [],
        isFiltering: false,
    },
    action
) {
    switch (action.type) {
        case INIT_PAGINATION: {
            let pages = PaginationUtil.divideListIntoPages(action.data, action.pageSize)
            let pageNumber = 1
            return Object.assign({}, state, {
                pageSize: action.pageSize,
                pageNumber: pageNumber,
                pages: pages,
                sortCounter: 0,
                currentPage: pages[pageNumber - 1]
            })
        }
        case NEXT_PAGE: {
            let pageNumber = state.pageNumber + 1
            if(pageNumber - 1 < state.pages.length) {
                return Object.assign({}, state, {
                    pageNumber: pageNumber,
                    currentPage: state.pages[pageNumber - 1]
                })
            }
        }
        case PREV_PAGE: {
            let pageNumber = state.pageNumber - 1
            if(pageNumber > 0) {
                return Object.assign({}, state, {
                    pageNumber: pageNumber,
                    currentPage: state.pages[pageNumber - 1]
                })
            }
        }
        case SORT: {
            let sortCounter = state.sortCounter + 1
            let pageNumber = state.pageNumber
            if(sortCounter >= 3)
                sortCounter = 0

            let currentPage
            if(state.isFiltering)
                currentPage = PaginationUtil.sortPage(state.pages[pageNumber - 1].slice(), action.column, sortCounter)
            else
                currentPage = PaginationUtil.sortPage(state.currentPage, action.column, sortCounter)

            return Object.assign({}, state, {
                sortCounter: sortCounter,
                sortColumn: action.column,
                currentPage: currentPage
            })
        }
        case FIRSTNAME_FILTER: {
            return Object.assign({}, state, {
                filters: Object.assign({}, state.filters, {
                    firstName: Object.assign({}, state.filters.firstName, {
                        value: action.value 
                    })
                })
            })
        }
        case LASTNAME_FILTER: {
            return Object.assign({}, state, {
                filters: Object.assign({}, state.filters, {
                    lastName: Object.assign({}, state.filters.lastName, {
                        value: action.value 
                    })
                })
            })
        }
        case DATEOFBIRTH_FILTER: {
            return Object.assign({}, state, {
                filters: Object.assign({}, state.filters, {
                    dateOfBirth: Object.assign({}, state.filters.dateOfBirth, {
                        value: action.value 
                    })
                })
            })
        }
        case COMPANY_FILTER: {
            return Object.assign({}, state, {
                filters: Object.assign({}, state.filters, {
                    company: Object.assign({}, state.filters.company, {
                        value: action.value 
                    })
                })
            })
        }
        case NOTE_FILTER: {
            return Object.assign({}, state, {
                filters: Object.assign({}, state.filters, {
                    note: Object.assign({}, state.filters.note, {
                        value: action.value 
                    })
                })
            })
        }
        case RESET_FILTERS: 
            return Object.assign({}, state, {
                isFiltering: false,
                filters: [],
                currentPage: state.pages[state.pageNumber - 1].slice()
            })
        case FILTER: {
            return Object.assign({}, state, {
                isFiltering: false,
                currentPage: PaginationUtil.filterCurrentPage(state)
            })
        }
        default:
            return state
    }
}