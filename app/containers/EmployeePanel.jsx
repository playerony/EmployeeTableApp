import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchEmployees } from '../actions/employees.action'
import EmployeeTable from '../components/EmployeeTable.jsx'

class EmployeePanel extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(fetchEmployees())
    }

    render() {
        const { isFetching, isError, payload, error } = this.props

        return (
            <div>
                {isError && 
                    <div>
                        <strong>Error!</strong> {error.message}.
                    </div>}

                {!isError && isFetching && payload.length === 0 && <h2>Loading...</h2>}
                {!isError && !isFetching && payload.length === 0 && <h2>There are no records to show.</h2>}

                {!isError && payload.length > 0 && 
                    <div>
                        <EmployeeTable employees = {payload} />
                    </div>
                }
            </div>
        )
    }
}

EmployeePanel.propTypes = {
    payload: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { fetchEmployees } = state

    const {
        isFetching,
        isError,
        payload: payload,
        error
    } = fetchEmployees || {
        isFetching: true,
        isError: true,
        payload: []
    }

    return {
        payload,
        isFetching,
        isError,
        error
    }
}
export default connect(mapStateToProps)(EmployeePanel)
