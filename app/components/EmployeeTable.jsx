import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EmployeeRow from './EmployeeRow.jsx'

class EmployeeTable extends Component {
    render() {
        let employees = this.props.employees.map(employee => 
            <EmployeeRow key = {employee.id}
                         employee = {employee} />
        )

        return (
            <table>
                <thead>
                    <tr>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>dateOfBirth</th>
                        <th>company</th>
                        <th>note</th>
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
    employees: PropTypes.array.isRequired
}

export default EmployeeTable