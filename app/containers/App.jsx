import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
    Switch,
    Route,
    BrowserRouter
} from 'react-router-dom'

import configureStore from '../configureStore'
import EmployeePanel from '../containers/EmployeePanel.jsx'
import NavigationBar from '../components/NavigationBar.jsx'
import Footer from '../components/Footer.jsx'

const store = configureStore()

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <div className="container">
                        <NavigationBar />

                        <div>
                            <Switch>
                                <Route exact path='/' component={EmployeePanel}/>
                            </Switch>
                        </div>

                        <Footer />
                    </div>
                </Provider>
            </BrowserRouter>
        )
    }
}
export default App