import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import {
    addFirstNameFilter,
    addLastNameFilter,
    addDateOfBirthFilter,
    addCompanyFilter,
    addNoteFilter,
    resetFilters,
    filter
} from '../actions/pagination.action'

class FilterMenu extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onFirstNameChange = this.onFirstNameChange.bind(this)
        this.onLastNameChange = this.onLastNameChange.bind(this)
        this.onDateOfBirthChange = this.onDateOfBirthChange.bind(this)
        this.onCompanyChange = this.onCompanyChange.bind(this)
        this.onNoteChange = this.onNoteChange.bind(this)
        this.reset = this.reset.bind(this)
    }

    onSubmit(event) {
        event.preventDefault()

        const { dispatch } = this.props

        dispatch(filter())
    }

    onFirstNameChange(event) {
        event.preventDefault()

        const { dispatch } = this.props

        dispatch(addFirstNameFilter(event.target.value))
    }

    onLastNameChange(event) {
        event.preventDefault()

        const { dispatch } = this.props

        dispatch(addLastNameFilter(event.target.value))
    }

    onDateOfBirthChange(event) {
        event.preventDefault()

        const { dispatch } = this.props

        dispatch(addDateOfBirthFilter(event.target.value))
    }

    onCompanyChange(event) {
        event.preventDefault()

        const { dispatch } = this.props

        dispatch(addCompanyFilter(event.target.value))
    }

    onNoteChange(event) {
        event.preventDefault()

        const { dispatch } = this.props

        dispatch(addNoteFilter(event.target.value))
    }

    reset(event) {
        event.preventDefault()

        const { dispatch } = this.props

        dispatch(resetFilters())
    }

    render() {
        const { pagination } = this.props

        return (
            <div>
                <h1>Filters:</h1>

                <form onSubmit={this.onSubmit} className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="firstName">First name:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" onChange={this.onFirstNameChange} id="firstName"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="lastName">Last name:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" onChange={this.onLastNameChange} id="lastName"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="dateOfBirth">Date of birth:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="date" onChange={this.onDateOfBirthChange} id="dateOfBirth"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="company">Company:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" onChange={this.onCompanyChange} id="company"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="note">Note:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="number" onChange={this.onNoteChange} id="note"/>
                        </div>
                    </div>

                    <div className="form-group">        
                        <div className="col-sm-offset-2 col-sm-7">
                            <input type="submit" value="Filtruj" className="btn btn-success" />
                        </div>
                        <button className="btn btn-danger col-sm-3" onClick={this.reset}>Reset filters</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { pagination } = state

    return {
        pagination
    }
}
export default connect(mapStateToProps)(FilterMenu)