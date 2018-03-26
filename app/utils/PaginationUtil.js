export function divideListIntoPages(data, pageSize) {
    let pages = []
    let pageElements = []

    for(let i=1 ; i<=data.length ; i++) {
        pageElements.push(data[i-1])
        if(i % pageSize == 0) {
            pages.push(pageElements)
            pageElements = []
        }
    }

    if(pageElements.length > 0)
        pages.push(pageElements)

    return pages
}

export function filterCurrentPage(state) {
    let data = state.pages[state.pageNumber - 1].slice()
    var filters = state.filters

    if(filters.firstName != undefined && filters.firstName.value != null && filters.firstName.value.length > 0)
        data = data.filter((a) => a.firstName.startsWith(filters.firstName.value))

    if(filters.lastName != undefined && filters.lastName.value != null && filters.lastName.value.length > 0)
        data = data.filter((a) => a.lastName.startsWith(filters.lastName.value))

    if(filters.dateOfBirth != undefined && filters.dateOfBirth.value != null && filters.dateOfBirth.value.length > 0)
        data = data.filter((a) => stringToDate(a.dateOfBirth) > stringToDate(filters.dateOfBirth.value, false))

    if(filters.company != undefined && filters.company.value != null && filters.company.value.length > 0)
        data = data.filter((a) => a.company.startsWith(filters.company.value))

    if(filters.note != undefined && filters.note.value != null && filters.note.value.length > 0)
        data = data.filter((a) => a.note > filters.note.value)

    return data
}

export function sortPage(currentPage, column, option) {
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

function stringToDate(date, format = true) {
    if(format)
        return new Date(date.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
    else
        return new Date(date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1"));
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