import React from 'react'
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import App from './App'

function Routers() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={App} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routers
