import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchEmployees } from '../actions/employees.action'
import { nextPage, prevPage } from '../actions/pagination.action'
import EmployeeTable from '../components/EmployeeTable.jsx'

class EmployeePanel extends Component {
    constructor(props) {
        super(props)

        this.handleNextPageClick = this.handleNextPageClick.bind(this)
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(fetchEmployees())
    }

    handleNextPageClick() {
        const { dispatch, pagination } = this.props

        dispatch(nextPage(pagination.pageNumber))
    }

    handlePreviousPageClick() {
        const { dispatch, pagination } = this.props

        dispatch(prevPage(pagination.pageNumber))
    }

    render() {
        const { isFetching, isError, payload, error, pagination } = this.props

        return (
            <div>
                {isError && 
                    <div>
                        <strong>Error!</strong> {error.message}.
                    </div>}

                {!isError && isFetching && payload.length === 0 && <h2>Loading...</h2>}
                {!isError && !isFetching && payload.length === 0 && <h2>There are no records to show.</h2>}

                {!isError && pagination.pages != undefined && pagination.pages.length > 0 && 
                    <div>
                        <div>
                            <EmployeeTable pagination = {pagination} />
                        </div>

                        <div>
                            <button onClick={this.handlePreviousPageClick}>Previous</button>
                            <button onClick={this.handleNextPageClick}>Next</button>
                        </div>
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
    const { fetchEmployees, pagination } = state

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
        pagination,
        payload,
        isFetching,
        isError,
        error
    }
}
export default connect(mapStateToProps)(EmployeePanel)
