import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EmployeeRow from './EmployeeRow.jsx'

class EmployeeTable extends Component {
    render() {
        const { pagination, onClick } = this.props

        let employees = pagination.currentPage.map(employee => 
            <EmployeeRow key = {employee.id}
                         employee = {employee} />
        )

        return (
            <table>
                <thead>
                    <tr>
                        <th onClick={e => onClick('firstName')}>firstName</th>
                        <th onClick={e => onClick('lastName')}>lastName</th>
                        <th onClick={e => onClick('dateOfBirth')}>dateOfBirth</th>
                        <th onClick={e => onClick('company')}>company</th>
                        <th onClick={e => onClick('note')}>note</th>
                    </tr>
                </thead>
                <tbody>
                    {employees}
                </tbody>
            </table>
        )
    }
}

EmployeeTable.propTypes = {
    pagination: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

export default EmployeeTable