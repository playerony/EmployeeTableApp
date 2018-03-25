import {
    NEXT_PAGE,
    PREV_PAGE,
    INIT_PAGINATION,
    SORT
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

function sortPage(currentPage, column, option) {
    currentPage.sort(function(a, b) {
        let firstObject = a[column]
        let secondObject = b[column]

        if(!isNaN(stringToDate(firstObject).getDate()) && !isNaN(stringToDate(secondObject).getDate())) {
            firstObject = stringToDate(firstObject)
            secondObject = stringToDate(secondObject)
        }
            
        return compareObjects(firstObject, secondObject, option)
    })

    return currentPage
}

function stringToDate(date) {
    return new Date(date.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
}

function compareObjects(firstObject, secondObject, option) {
    if(option == 1) {
        if(firstObject > secondObject) return -1;
        if(firstObject < secondObject) return 1;
    } else if(option == 2) {
        if(firstObject < secondObject) return -1;
        if(firstObject > secondObject) return 1;
    }

    return 0;
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
                sortCounter: 0,
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
        case SORT: {
            let isSorted = true
            let sortCounter = state.sortCounter + 1
            let pageNumber = state.pageNumber
            if(sortCounter >= 3)
                sortCounter = 0

            if(sortCounter == 0)
                isSorted = false

            return Object.assign({}, state, {
                isSorted: isSorted,
                sortCounter: sortCounter,
                currentPage: sortPage(state.pages[pageNumber - 1].slice(), action.column, sortCounter),
            })
        }
        default:
            return state
    }
}