import React,{useEffect, useState} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import { updateCategory, getCategory } from './helper/adminapicall'
import { useParams } from 'react-router-dom'

const UpdateCategory = () => {

    const {categoryId} = useParams();

    const [name,setName] = useState("");
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);

    const {user,token} = isAuthenticated();

    const preLoad = (categoryId)=>{
        getCategory(categoryId)
        .then(data=>{
            if(data.error){
                setError(true)
            }
            else{
                setName(data.name)
            }
        })
    }

    useEffect(()=>{
        preLoad(categoryId)
    },[]);

    const handleChange = (event)=>{
        setError("");
        setName(event.target.value)
    }

    const onSubmit = event =>{
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request fired
        updateCategory(categoryId, user._id, token, {name})
        .then(data=>{
            if(data.error){
                setError(true)
            }
            else{
                setError("");
                setSuccess(true);
                setName("")
            }
        })
    }

    const goBack = () =>(
        <div className='mt-5'>
            <Link className='btn btn-sm btn-success mb-3' to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const successMessage = ()=>{
        if(success){
            return <h4 className='text-success'>Category updated successfully</h4>
        }
    }

    const warningMessage = () =>{
        if(error){
            return <h4 className='text-success'>Failed to update category</h4>
        }
    }

    const myCategoryForm = () =>(
        <form>
            <div className='form-group'>
                <p className='lead'>Enter the category</p>
                <input type='text' className='form-control my-3' autoFocus required placeholder='For Ex. Winter' onChange={handleChange} value={name}/>
                <button onClick={onSubmit} className='btn btn-outline-info'>Update category</button>
            </div>
        </form>
    )

  return (
    <Base title='Update a category here'
    description='Update a old category for new trends'
    className='container bg-info p-4'
    >
        <div className='row bg-white rounded'>
            <div className='col-md-8 offset-md-2'>
                {successMessage()}
                {warningMessage()}
                {myCategoryForm()}
                {goBack()}
            </div>
        </div>
    </Base>
  )
}

export default UpdateCategory;