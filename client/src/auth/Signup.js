import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../core/Layout'

function Signup() {
    const [values,setValues] = useState({
        name: "Madan",
        email:"mmadan3600@gmail.com",
        password: 'mypassword',
        buttonText: 'Submit :)'
    })
    const {name,email,password,buttonText} = values;
    const handleChange= (name)=> (event)=> {
        setValues({...values, [name]: event.target.value})
    }
    const clickSubmit= event=> {
        event.preventDefault()
        axios({
            method: 'POST',
            url:`${process.env.REACT_APP_API}/signup`,
            data: {name,email,password}

        })
        .then(response=> {
            console.log('Signup Success',response)
            setValues({...values,name:'', email:'',password:'',buttonText:'Submited (:'})
            toast.success(response.data.message)
        })
        .catch(error=> {
            console.log('Signup error',error.response.data)
            setValues({...values, buttonText:'Submit :)'});
            toast.error(error.response.data.error)
        })
    }

    const signupForm = ()=> (
        <form>
            <div className="div form-group">
                <label htmlFor="">Name</label>
                <input type='text' className='form-control' value={name} onChange={handleChange('name')}/> 
            </div>
            <div className="div form-group">
                <label htmlFor=""> Email</label>
                <input type='text' className='form-control' value={email} onChange={handleChange('email')}/> 
            </div>
            <div className="div form-group">
                <label htmlFor="" >Password </label>
                <input type='text' className='form-control' value={password} type='password' onChange={handleChange('password')}/> 
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
            <h1 className='p-5 text-center'>SignUp</h1>
            {signupForm()}

            </div>
        </Layout>
    )
}

export default Signup
