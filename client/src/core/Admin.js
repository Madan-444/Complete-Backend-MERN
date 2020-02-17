import React,{useState,useEffect} from 'react'
// import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import {isAuth,getCookie, signout,updateUser} from '../auth/Helpers'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../core/Layout'


function Private({history}) {
    const [values,setValues] = useState({
        role: '',
        name: "",
        email:"",
        password: '',
        buttonText: 'Submit :)'
    });

    const token = getCookie('token');

    useEffect(()=> {
        loadProfile()
    },[]);

    const loadProfile=()=> {
        axios({
            method:'GET',
            url:`${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response=> {
            console.log('PRIVATE PROFILE UPDATE',response)
            const {role,name,email} = response.data
            setValues({...values,role,name,email})
        })
        .catch(error=> {
            console.log('PROFILE UPDATE UPDATE ERROR',error.response.data.error)
            if(error.response.status === 401){
                signout(()=> {
                    history.push('/')
                })
            }
        })
    }

    const {name,email,password,buttonText,role} = values;
    const handleChange= (name)=> (event)=> {
        setValues({...values, [name]: event.target.value})
    }
    const clickSubmit= event=> {
        event.preventDefault()
        axios({
            method: 'PUT',
            url:`${process.env.REACT_APP_API}/admin/update`,
            data: {name,password},
            headers: {
                Authorization: `Bearer ${token}`
            }

        })
        .then(response=> {
            console.log('Profile update success !',response)
            updateUser(response, ()=> {
                setValues({...values,buttonText:'Submited (:'})
                toast.success('Profile updated successfully ! ')
            })
           
        })
        .catch(error=> {
            console.log('Profile update error',error.response.data.error)
            setValues({...values, buttonText:'Submit :)'});
            toast.error(error.response.data.error)
        })
    }

    const updateForm = ()=> (
        <form>
            <div className="div form-group">
                <label htmlFor="" >Role</label>
                <input type='text' className='form-control text-muted' value={role} onChange={handleChange('name')} disabled /> 
            </div>
            <div className="div form-group">
                <label htmlFor="" >Name</label>
                <input type='text' className='form-control' value={name} onChange={handleChange('name')}/> 
            </div>
            <div className="div form-group">
                <label htmlFor=""> Email</label>
                <input type='text' className='form-control' value={email} onChange={handleChange('email')} disabled /> 
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
            <h1 className='p-5 text-center'>Profile Update</h1>
            {updateForm()}

            </div>
        </Layout>
    )
}

export default Private
