import React, { Fragment } from "react";
import {Link} from 'react-router-dom'
import './layou.css'

function Layout({ children }) {
  const nav = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <a className="navbar-brand" style={{color:'white'}}>Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link hver" to='/' style={{color:'white'}}>  Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link hver" to='/signup' style={{color:'white'}}>SignUp <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link hver" to='/signin' style={{color:'white'}}>SignIn <span className="sr-only">(current)</span></Link>
      </li>
      
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

export default Layout;
