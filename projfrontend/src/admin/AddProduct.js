import React, { useEffect, useState } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { createaProduct, getCategories } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'

const AddProduct = () => {

  const {user, token} = isAuthenticated();

  const  [values,setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  })

  const {name, description, price, stock, categories, category, loading, error, createdProduct, getaRedirect, formData} = values;

  const preLoad = ()=>{
    getCategories()
    .then(data=>{
      console.log(data);
      if(data.error){
        setValues({...values, error: data.error})
      }
      else{
        setValues({...values, categories: data, formData: new FormData()})
      }
    })
  }

  useEffect(()=>{
    preLoad();
  },[]);

  const onSubmit = (event)=>{
    event.preventDefault();
    setValues({...values, error: "", loading: true})
    createaProduct(user._id, token, formData)
    .then(data=>{
      if(data.error){
        setValues({...values, error: data.error})
      }
      else{
        setValues({...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          loading: false,
          createdProduct: data.name,
          getaRedirect: true,
        })
      }
    })
    .catch()
  }

  const handleChange = name => event =>{
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value});
  }

  const successMessage = ()=>(
    <div className='alert alert-success mt-3' style={{display: createdProduct ? "" : "none"}}>
        <h4>{createdProduct} created successfully</h4>
    </div>
  )

  const warningMessage = ()=>(
    <div className='alert alert-warning mt-3' style={{display: error ? "" : "none"}}>
        <h4>{error}</h4>
    </div>
  )

  const redirect = ()=>{
    if(getaRedirect){
      setTimeout(()=>window.location.href = '/admin/dashboard',2000)
    }
  }

  const createProductForm = () => (
    <form >
      <span>Post photo</span>
      <div className="form-group py-2">
        <label className="btn btn-block btn-success w-100">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group py-2">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group py-2">
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group py-2">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group py-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories && 
          categories.map((cate, index)=>(
            <option key={index} value={cate._id}>{cate.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group py-2">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="stock"
          value={stock}
        />
      </div>
      
      <div className='my-2'>
      <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
        Create Product
      </button>
      </div>
    </form>
  );

  return (
    <Base title='Add a product here' description='Welcome to product creation section' className='container bg-info p-4'>
        <Link to="/admin/dashboard" className='btn btn-md btn-success mb-3'>Admin Home</Link>
        <div className='row bg-dark text-white rounded'>
            <div className='col-md-8 offset-md-2'>
              {successMessage()}
              {warningMessage()}
              {createProductForm()}
              {redirect()}
              
            </div>
        </div>
    </Base>
  )
}

export default AddProduct;