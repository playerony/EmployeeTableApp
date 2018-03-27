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
        isSorting: false,
        sortColumn: "",
        sortCounter: 0,
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
                currentPage: pages[pageNumber - 1]
            })
        }
        case NEXT_PAGE: {
            let pageNumber = state.pageNumber + 1
            
            if(pageNumber > state.pages.length)
                pageNumber = state.pages.length
            
            return Object.assign({}, state, {
                pageNumber: pageNumber,
                currentPage: state.pages[pageNumber - 1],
                isSorting: false,
                isFiltering: false,
                filters: [],
                sortColumn: "",
                sortCounter: 0
            })
        }
        case PREV_PAGE: {
            let pageNumber = 1

            if(pageNumber > 1)
                pageNumber = state.pageNumber - 1

            return Object.assign({}, state, {
                pageNumber: pageNumber,
                currentPage: state.pages[pageNumber - 1],
                isSorting: false,
                isFiltering: false,
                filters: [],
                sortColumn: "",
                sortCounter: 0
            })
        }
        case SORT: {
            let sortCounter = state.sortCounter + 1
            let pageNumber = state.pageNumber

            if(sortCounter >= 3)
                sortCounter = 0

            let currentPage
            if(!state.isFiltering)
                currentPage = PaginationUtil.sortPage(state.pages[pageNumber - 1].slice(), action.column, sortCounter)
            else
                currentPage = PaginationUtil.sortPage(state.currentPage, action.column, sortCounter)

            return Object.assign({}, state, {
                sortCounter: sortCounter,
                sortColumn: action.column,
                currentPage: currentPage
            })
        }
        case FILTER: {
            let currentPage = PaginationUtil.filterCurrentPage(state)

            if(state.isSorting)
                currentPage = PaginationUtil.sortPage(currentPage, state.sortColumn, state.sortCounter)

            return Object.assign({}, state, {
                isFiltering: true,
                currentPage
            })
        }
        case RESET_FILTERS: {
            let currentPage = state.pages[pageNumber - 1].slice()

            if(state.isSorting)
                currentPage = PaginationUtil.sortPage(currentPage, state.sortColumn, state.sortCounter)

            return Object.assign({}, state, {
                isFiltering: false,
                filters: [],
                currentPage
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
        default:
            return state
    }
}