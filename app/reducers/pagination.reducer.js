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
            return Object.assign({}, state, {
                pageSize: action.pageSize,
                pageNumber: 1,
                pages: this.getPages(action.data, action.pageSize)
            })
        case NEXT_PAGE:
            if(action.pageNumber < state.pages.length)
                return Object.assign({}, state, {
                    pageNumber: action.pageNumber + 1
                })
        case PREV_PAGE:
            if(action.pageNumber > 1)
                return Object.assign({}, state, {
                    pageNumber: action.pageNumber - 1
                })
        default:
            return state
    }
}