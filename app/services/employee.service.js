import fetch from 'isomorphic-fetch'

export function fetchEmployees() {
    return fetch('../../data.json')
        .then(function (response) {
            return response.json()
        })
}