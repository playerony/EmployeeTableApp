import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from '../configureStore'
import EmployeePanel from '../containers/EmployeePanel.jsx'

const store = configureStore()

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <EmployeePanel />
            </Provider>
        )
    }
}
export default App