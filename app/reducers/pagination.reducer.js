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
        filtering: {
            filters: [],
            isFiltering: false
        },
        sorting: {
            isSorting: false,
            sortColumn: "",
            sortCounter: 0
        }
    },
    action
) {
    switch (action.type) {
        case INIT_PAGINATION: {
            let pages = PaginationUtil.divideListIntoPages(action.data, action.pageSize)
            let pageNumber = 1

            return Object.assign({}, state, {
                pageSize: action.pageSize,
                pageNumber,
                pages,
                currentPage: pages[pageNumber - 1]
            })
        }
        case NEXT_PAGE: {
            let pageNumber = state.pageNumber + 1
            
            if(pageNumber > state.pages.length)
                pageNumber = state.pages.length
            
            return Object.assign({}, state, {
                sorting: {
                    isSorting: false,
                    sortColumn: "",
                    sortCounter: 0
                },
                filtering: {
                    isFiltering: false,
                    filters: []
                },
                pageNumber,
                currentPage: state.pages[pageNumber - 1]
            })
        }
        case PREV_PAGE: {
            let pageNumber = state.pageNumber

            if(pageNumber > 1)
                pageNumber = pageNumber - 1

            return Object.assign({}, state, {
                sorting: {
                    isSorting: false,
                    sortColumn: "",
                    sortCounter: 0
                },
                filtering: {
                    isFiltering: false,
                    filters: []
                },
                pageNumber,
                currentPage: state.pages[pageNumber - 1]
            })
        }
        case SORT: {
            let sortCounter = state.sorting.sortCounter + 1
            let pageNumber = state.pageNumber
            let currentPage

            if(sortCounter >= 3)
                sortCounter = 0

            if(action.column !== state.sorting.sortColumn)
                sortCounter = 1

            if(!state.filtering.isFiltering)
                currentPage = PaginationUtil.sortPage(state.pages[pageNumber - 1].slice(), action.column, sortCounter)
            else
                currentPage = PaginationUtil.sortPage(state.currentPage, action.column, sortCounter)

            return Object.assign({}, state, {
                sorting: Object.assign({}, state.sorting, {
                    isSorting: true,
                    sortCounter,
                    sortColumn: action.column
                }),
                currentPage
            })
        }
        case FILTER: {
            let currentPage = PaginationUtil.filterCurrentPage(state)

            if(state.isSorting)
                currentPage = PaginationUtil.sortPage(currentPage, state.sortColumn, state.sortCounter)

            return Object.assign({}, state, {
                filtering: Object.assign({}, state.filtering, {
                    isFiltering: true
                }),
                currentPage
            })
        }
        case RESET_FILTERS: {
            let currentPage = state.pages[state.pageNumber - 1].slice()

            if(state.sorting.isSorting)
                currentPage = PaginationUtil.sortPage(currentPage, state.sorting.sortColumn, state.sorting.sortCounter)

            return Object.assign({}, state, {
                filtering: {
                    isFiltering: false,
                    filters: [],
                },
                currentPage
            })
        }
        case FIRSTNAME_FILTER: {
            return Object.assign({}, state, {
                filtering: Object.assign({}, state.filtering, {
                    filters: Object.assign({}, state.filtering.filters, {
                        firstName: Object.assign({}, state.filtering.filters.firstName, {
                            value: action.value 
                        })
                    })
                })
            })
        }
        case LASTNAME_FILTER: {
            return Object.assign({}, state, {
                filtering: Object.assign({}, state.filtering, {
                    filters: Object.assign({}, state.filtering.filters, {
                        lastName: Object.assign({}, state.filtering.filters.lastName, {
                            value: action.value 
                        })
                    })
                })
            })
        }
        case DATEOFBIRTH_FILTER: {
            return Object.assign({}, state, {
                filtering: Object.assign({}, state.filtering, {
                    filters: Object.assign({}, state.filtering.filters, {
                        dateOfBirth: Object.assign({}, state.filtering.filters.dateOfBirth, {
                            value: action.value 
                        })
                    })
                })
            })
        }
        case COMPANY_FILTER: {
            return Object.assign({}, state, {
                filtering: Object.assign({}, state.filtering, {
                    filters: Object.assign({}, state.filtering.filters, {
                        company: Object.assign({}, state.filtering.filters.company, {
                            value: action.value 
                        })
                    })
                })
            })
        }
        case NOTE_FILTER: {
            return Object.assign({}, state, {
                filtering: Object.assign({}, state.filtering, {
                    filters: Object.assign({}, state.filtering.filters, {
                        note: Object.assign({}, state.filtering.filters.note, {
                            value: action.value 
                        })
                    })
                })
            })
        }
        default:
            return state
    }
}