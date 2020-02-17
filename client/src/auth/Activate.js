import React,{useState,useEffect } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../core/Layout'

function Activate({match}) {
    const [values,setValues] = useState({
        name: "",
        token:"",
        show:true
    })
    useEffect(()=> {
        console.log('useeffect run');
        let token = match.params.token
        let {name} = jwt.decode(token)
        if(token){
            setValues({...values,name,token})
        }
    },[])
    const {name,token} = values;
    const clickSubmit= event=> {
        event.preventDefault()
        axios({
            method: 'POST',
            url:`${process.env.REACT_APP_API}/account-activation`,
            data: {token}

        })
        .then(response=> {
           setValues({...values,show:false});
           toast.success(response.data.message)
        })
        .catch(error=> {
            console.log('Signup error',error.response.data)
            toast.error(error.response.data.error)
           
        })
    }
    const activationLink=()=> (
        <div>
            <h1 className='p-5 text-center'> Hey  {name}, Ready to activate your account ? </h1>
            <button className='btn btn-outline-primary' onClick={clickSubmit}>Activate Accounte</button>
        </div>
    )

    return (
        <Layout>
            <div className='col-md-6 offset-md-3'>
            <ToastContainer />
            {activationLink()}

            </div>
        </Layout>
    )
}

export default Activate
