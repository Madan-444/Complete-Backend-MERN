import React, { Fragment } from "react";
import {Link,withRouter} from 'react-router-dom'
import './layou.css'
import {isAuth ,signout} from '../auth/Helpers'

function Layout({ children,match,history }) {
  const isActive = path=> {
    if(match.path=== path){
      return { color:'yellow'}
    } else {
      return  {color: '#fff'}
    }
  }

  const nav = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <a className="navbar-brand" style={{color:'white'}}>Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link hver" to='/' style={isActive('/')}>  Home <span className="sr-only">(current)</span></Link>
      </li>
      {!isAuth() && (
            <>
              <li className="nav-item active">
              <Link className="nav-link hver" to='/signup' style={isActive('/signup')}>SignUp <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link hver" to='/signin' style={isActive('/signin')}>SignIn <span className="sr-only">(current)</span></Link>
            </li>
            </>
      ) }
      {isAuth() && (
        <li className="nav-item active">
        <span className="nav-link"  style={{color:'white',width:'65px',borderRadius:'20px' , backgroundColor:'orange', cursor:'pointer'}}> {isAuth().name} <span className="sr-only">(current)</span></span>
      </li>
      )}
      {isAuth() && (
        <li className="nav-item active">
        <a><span className="nav-link hver" onClick={()=> {
          signout((next)=> {
            history.push('/')
          })
        }} style={{color:'white',cursor:'pointer'}}>SignOut <span className="sr-only">(current)</span></span></a>
      </li>
      )}
      
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
  );
  return (
    <Fragment>
      {nav()}
      <div className="container"> {children} </div>
    </Fragment>
  );
}

export default withRouter(Layout);
