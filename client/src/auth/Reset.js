import React,{useState,useEffect} from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../core/Layout'

function Reset({match}) {
    const [values,setValues] = useState({
        name:'',
        token: '',
        email:'',
        newPassword:'',
        buttonText: 'Reset password !'
    })

    useEffect(()=> {
        let token = match.params.token
        let {name,email} = jwt.decode(token)

        if(token){
            setValues({
                ...values,name,email,token
            })
        }
    },[])

    const {name,email,newPassword,buttonText} = values;
    const handleChange= (event)=> {
        setValues({...values, newPassword: event.target.value})
    }
    const clickSubmit= event=> {
        event.preventDefault()
        console.log('The email has been sent to the server')
        axios({
            method: 'PUT',
            url:`${process.env.REACT_APP_API}/reset-password`,
            data: {newPassword,resetPasswordLink: match.params.token}

        })
        .then(response=> {
            console.log('Reset Password success',response)
            toast.success(response.data.message)
            setValues({...values,buttonText:'Done ):'})
           
            
        })
        .catch(error=> {

            toast.error(error.response.data.error)
            setValues({...values, buttonText:'Reset Password !'})
        })
    }

    const resetPasswordForm = ()=> (
        <form>

            <div className="div form-group">
                <label htmlFor="">Name</label>
                <input type='text' className='form-control' value={name} disabled /> 
            </div>

            <div className="div form-group">
                <label htmlFor=""> Email</label>
                <input type='text' className='form-control' value={email} disabled/> 
            </div>
            <div className="div form-group">
                <label htmlFor=""> Password</label>
                <input type='text' className='form-control' placeholder='Type new Password' required value={newPassword} onChange={handleChange}/> 
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
    
            <h1 className='p-5 text-center'> Reset Password '{name}' ? </h1>
            {resetPasswordForm()}

            </div>
        </Layout>
    )
}

export default Reset
