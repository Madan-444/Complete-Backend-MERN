import React,{useState} from 'react'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../core/Layout'

function Forgot({history}) {
    const [values,setValues] = useState({
        email:"",
        buttonText: 'Reset password request'
    })
    const {email,buttonText} = values;
    const handleChange= (event)=> {
        setValues({...values, email: event.target.value})
    }
    const clickSubmit= event=> {
        event.preventDefault()
        console.log('The email has been sent to the server')
        axios({
            method: 'PUT',
            url:`${process.env.REACT_APP_API}/forgot-password`,
            data: {email}

        })
        .then(response=> {
            console.log('Forgot password Success',response)
            toast.success(response.data.message)
            setValues({...values,buttonText:'Requested'})
           
            
        })
        .catch(error=> {

            toast.error(error.response.data.error)
            setValues({...values, buttonText:'Submit'})
        })
    }

    const forgotPasswordForm = ()=> (
        <form>

            <div className="div form-group">
                <label htmlFor=""> Email</label>
                <input type='text' className='form-control' value={email} onChange={handleChange}/> 
            </div>
        
            <div>
                <button className='btn btn-secondary'  onClick={clickSubmit}> {buttonText} </button>
            </div>
        </form>
    )
    return (
        <Layout>
            
            <div className='col-md-6 offset-md-3'>
            <ToastContainer />
    
            <h1 className='p-5 text-center'>Forgot Password ??</h1>
            {forgotPasswordForm()}

            </div>
        </Layout>
    )
}

export default Forgot
