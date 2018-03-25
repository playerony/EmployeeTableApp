import {
    NEXT_PAGE,
    PREV_PAGE,
    INIT_PAGINATION
} from '../constants/pagination.constants.js'

function getPages(data, pageSize) {
    let pages = []
    let elements = []

    for(let i=1 ; i<=data.length ; i++) {
        elements.push(data[i-1])
        if(i % pageSize == 0) {
            pages.push(elements)
            elements = []
        }
    }
    pages.push(elements)

    return pages
}

export function pagination(
    state = {

    },
    action
) {
    switch (action.type) {
        case INIT_PAGINATION:
            let pages = getPages(action.data, action.pageSize)
            let pageNumber = 1
            return Object.assign({}, state, {
                pageSize: action.pageSize,
                pageNumber: pageNumber,
                pages: pages,
                currentPage: pages[pageNumber - 1]
            })
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
        default:
            return state
    }
}