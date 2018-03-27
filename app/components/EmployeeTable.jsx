import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EmployeeRow from './EmployeeRow.jsx'

class EmployeeTable extends Component {
    constructor(props) {
        super(props)

        this.checkColumnSortState = this.checkColumnSortState.bind(this)
    }

    checkColumnSortState(sortColumn, targetColumn, sortCounter) {
        if(sortColumn === targetColumn && sortCounter > 0) 
            return sortCounter === 1 ? 'DESC' : 'ASC'
    }

    render() {
        const { currentPage, sortCounter, sortColumn, onClick } = this.props

        let employees = currentPage.map(employee => 
            <EmployeeRow key = {employee.id}
                         employee = {employee} />
        )

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th onClick={e => onClick('firstName')}>
                            First name
                            <strong> {this.checkColumnSortState(sortColumn, 'firstName', sortCounter)}</strong>
                        </th>
                        <th onClick={e => onClick('lastName')}>
                            Last name
                            <strong> {this.checkColumnSortState(sortColumn, 'lastName', sortCounter)}</strong>
                        </th>
                        <th onClick={e => onClick('dateOfBirth')}>
                            Date of birth
                            <strong> {this.checkColumnSortState(sortColumn, 'dateOfBirth', sortCounter)}</strong>
                        </th>
                        <th onClick={e => onClick('company')}>
                            Company
                            <strong> {this.checkColumnSortState(sortColumn, 'company', sortCounter)}</strong>
                        </th>
                        <th onClick={e => onClick('note')}>
                            Note
                            <strong> {this.checkColumnSortState(sortColumn, 'note', sortCounter)}</strong>
                        </th>
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
    currentPage: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    sortCounter: PropTypes.number,
    sortColumn: PropTypes.string
}

export default EmployeeTable