import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchEmployees } from '../actions/employees.action'
import { nextPage, prevPage, sort, filter } from '../actions/pagination.action'
import EmployeeTable from '../components/EmployeeTable.jsx'
import FilterMenu from '../containers/FilterMenu.jsx'

class EmployeePanel extends Component {
    constructor(props) {
        super(props)

        this.handleNextPageClick = this.handleNextPageClick.bind(this)
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this)
        this.handleSortPageByColumnClick = this.handleSortPageByColumnClick.bind(this)
    }

    componentDidMount() {
        const { dispatch, pagination } = this.props

        dispatch(fetchEmployees())
    }

    handleNextPageClick() {
        const { dispatch } = this.props

        dispatch(nextPage())
    }

    handlePreviousPageClick() {
        const { dispatch } = this.props

        dispatch(prevPage())
    }

    handleSortPageByColumnClick(column) {
        const { dispatch } = this.props

        dispatch(sort(column))
    }

    render() {
        const { isFetching, isError, payload, error, pagination } = this.props

        return (
            <div>
                {isError && 
                    <div className="alert alert-danger">
                        <strong>Error!</strong> {error.message}.
                    </div>}

                {!isError && isFetching && payload.length === 0 && <h2>Loading...</h2>}
                {!isError && !isFetching && payload.length === 0 && <h2>There are no records to show.</h2>}

                {!isError && pagination.pages !== undefined && pagination.pages.length > 0 && 
                    <div>
                        <div>
                            <EmployeeTable onClick={this.handleSortPageByColumnClick} 
                                           pagination={pagination} />
                        </div>

                        <div className="col-12 col-md-6 text-center">
                            <form>
                                <button className="btn btn-success" onClick={this.handlePreviousPageClick}>Previous page</button>
                            </form>
                        </div>
                        <div className="col-12 col-md-6 text-center">
                            <form>
                                <button className="btn btn-success" onClick={this.handleNextPageClick}>Next page</button>
                            </form>
                        </div>
                    </div>
                }

                <FilterMenu />
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
