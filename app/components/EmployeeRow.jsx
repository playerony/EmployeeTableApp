import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EmployeeRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.lastName}</td>
                <td>{this.props.employee.dateOfBirth}</td>
                <td>{this.props.employee.company}</td>
                <td>{this.props.employee.note}</td>
            </tr>
        )
    }
}

EmployeeRow.propTypes = {
    employee: PropTypes.object.isRequired,
    employee: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        dateOfBirth: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        note: PropTypes.number.isRequired
    })
}

export default EmployeeRow