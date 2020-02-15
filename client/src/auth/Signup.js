import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../core/Layout'

function Signup() {
    const [values,setValues] = useState({
        name: "Madan",
        email:"mmadan3600@gmail.com",
        password: '',
        buttonText: 'Submit :)'
    })
    const {name,email,password,buttonText} = values;
    const handleChange= (name)=> (event)=> {
        //
    }
    const clickSubmit= event=> {
        //
    }

    const signupForm = ()=> (
        <form>
            <div className="div form-group">
                <label htmlFor="" className='text-muted'>Name</label>
                <input type='text' className='form-control' value={name} onChange={handleChange('name')}/> 
            </div>
            <div className="div form-group">
                <label htmlFor="" className='text-muted'> Email</label>
                <input type='text' className='form-control' value={email} onChange={handleChange('email')}/> 
            </div>
            <div className="div form-group">
                <label htmlFor="" className='text-muted'>Password </label>
                <input type='text' className='form-control' onChange={handleChange('password')}/> 
            </div>
            <div>
                <button className='btn btn-secondary' onClick={clickSubmit}> {buttonText} </button>
            </div>
        </form>
    )
    return (
        <Layout>
            <div className='col-md-6 offset-md-3'>
            <ToastContainer />
            <h1 className='p-5 text-center'>SignUp</h1>
            {signupForm()}

            </div>
        </Layout>
    )
}

export default Signup
