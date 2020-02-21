import React,{useState} from 'react'
import {Redirect,Link} from 'react-router-dom'
import axios from 'axios'
import {authenticate,isAuth} from './Helpers'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../core/Layout'
import Google from './Google'
import Facebook from './Facebook'

function Signin({history}) {
    const [values,setValues] = useState({
        name: "madan",
        email:"mmadan3600@gmail.com",
        password: '',
        buttonText: 'Submit :)'
    })
    const {email,password,buttonText} = values;
    const handleChange= (name)=> (event)=> {
        setValues({...values, [name]: event.target.value})
    }
    const informParent = response => {
       authenticate(response, ()=> {
        isAuth() && isAuth().role === 'admin'? history.push('/admin') : history.push('/private')
       });
    }
    const clickSubmit= event=> {
        event.preventDefault()
        axios({
            method: 'POST',
            url:`${process.env.REACT_APP_API}/signin`,
            data: {email,password}

        })
        .then(response=> {
            console.log('Signup Success',response)
            // save the response (user,token) localstorage and cookie
            authenticate(response,()=> {
                setValues({...values,name:'', email:'',password:'',buttonText:'Submited (:'})
                // toast.success(`Hey ${response.data.user.name}, Welcome Back !`)
                isAuth() && isAuth().role === 'admin'? history.push('/admin') : history.push('/private')
            })
            
        })
        .catch(error=> {

            toast.error(error.response.data.error)
        })
    }

    const signinForm = ()=> (

        <form>
            
            <div className="div form-group">
                <label htmlFor=""> Email</label>
                <input type='text' className='form-control' value={email} onChange={handleChange('email')}/> 
            </div>
            <div className="div form-group">
                <label htmlFor="" >Password </label>
                <input type='text' className='form-control' value={password} type='password' onChange={handleChange('password')}/> 
                <Link to='/auth/password/forgot'> <p>Forgot Password ? Clicke here</p> </Link>

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
            <Google informParent = {informParent} />
             <Facebook informParent = {informParent} />
            { isAuth() ? <Redirect to= '/' /> : null}
            <h1 className='p-5 text-center'>SignIn </h1>
            {signinForm()}
           

            </div>
        </Layout>
    )
}

export default Signin
