import React  from 'react'
import { Route,Redirect} from 'react-router-dom'
import {isAuth} from './Helpers'

function AdminRoute({component: Component,...rest}) {
    return (
        <div>
            <Route {...rest} render={
                props=> isAuth() && isAuth().role==='admin' ? <Component {...props} /> : <Redirect to={{
                    pathname:'/signin',
                    state:{from:props.location}
                }} />
            } />
        </div>
    )
}

export default AdminRoute
